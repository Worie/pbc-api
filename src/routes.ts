import * as Express from 'express';
import Cache from './cache';
import Episodes from './pbc-episodes';

const router = Express.Router();

// create new redis cache instance
const cache = new Cache('pbc-cache');

/**
 * Returns a list of episodes
 */
router.get('/episodes', async (req, res) => {
  const cachedResponse = await cache.get('episodes');
  if (!cachedResponse) {
    const episodes = await Episodes();
    cache.set('episodes', episodes, 60*60*24);
    res.status(200).json(episodes);
  } else {
    res.status(200).json(cachedResponse);
  }
});

/**
 * Returns confirmation that API works
 */
router.get('/', async (req, res) => {
  res.status(200).json({
    status: `Working 💦`,
  });
});

/**
 * Clears cache
 */
router.get('/flush-cache', async (req, res) => {
  cache.flushAll();
  res.status(200).json({ status: 'ok'});
});


export default router;