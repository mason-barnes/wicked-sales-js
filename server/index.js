require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const text = 'SELECT "image", "name", "price", "productId", "shortDescription" FROM "products"';
  db.query(text)
    .then(result => {
      res.status(200).send(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const text = 'SELECT * FROM "products" WHERE "productId" = $1';
  const values = [req.params.productId];
  db.query(text, values)
    .then(result => {
      if (result.rows[0] === undefined) {
        next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
      } else {
        return res.status(200).send(result.rows[0]);
      }
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  if (req.session.cartId === undefined) {
    res.status(200).send([]);
  } else {
    const text = `SELECT "c"."cartItemId",
                         "c"."price",
                         "p"."productId",
                         "p"."image",
                         "p"."name",
                         "p"."shortDescription"
                    FROM "cartItems" as "c"
                    JOIN "products" as "p" USING("productId")
                    WHERE "c"."cartId" = $1`;
    const value = [req.session.cartId];
    db.query(text, value)
      .then(cart => {
        res.status(200).send(cart.rows);
      })
      .catch(err => next(err));
  }
});

app.post('/api/cart', (req, res, next) => {
  if (req.body.productId === undefined) {
    res.status(400).send({ error: 'productId not found in database' });
  }
  const text = 'SELECT "price" FROM "products" WHERE "productId" = $1';
  const values = [req.body.productId];
  db.query(text, values)
    .then(result => {
      if (result.rows[0] === undefined) {
        next(new ClientError(`productId ${req.body.productId} does not exist`, 400));
      } else if (req.session.cartId) {
        const object = {
          cartId: req.session.cartId,
          price: result.rows[0].price
        };
        return object;
      } else {
        const insert = `
          insert into "carts" ("cartId", "createdAt")
            values (default, default)
            returning "cartId"
        `;
        return (db.query(insert)
          .then(cartId => {
            const object = {
              cartId: cartId.rows[0].cartId,
              price: result.rows[0].price
            };
            return object;
          })
        );
      }
    })
    .then(results => {
      req.session.cartId = results.cartId;
      const text = 'INSERT INTO "cartItems" ("cartId", "productId", "price") VALUES($1, $2, $3) RETURNING "cartItemId"';
      const values = [results.cartId, req.body.productId, results.price];
      return (db.query(text, values)
        .then(result => {
          return result;
        })
      );
    })
    .then(result => {
      const text = `
        SELECT "c"."cartItemId",
               "c"."price",
               "p"."productId",
               "p"."image",
               "p"."name",
               "p"."shortDescription"
          FROM "cartItems" as "c"
          JOIN "products" as "p" USING ("productId")
          WHERE "c"."cartItemId" = $1
      `;
      const value = [result.rows[0].cartItemId];
      return (
        db.query(text, value)
          .then(result => {
            res.status(201).send(result.rows[0]);
          })
      );
    })
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
// res.status(200).send(result.rows[0])
