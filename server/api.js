const router = require('express').Router();
const { db, Puppy, Owner } = require('./db');

router.get('/', async (req, res, next) => {
  try {
    const puppy = await Puppy.findAll({
      include: [Owner],
    });
    res.json(puppy);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    // const [owner, wasCreated] = await Owner.findOrCreate({
    //   where: {
    //     name: req.body.name,
    //   },
    // });
    const newPuppy = await Puppy.create(req.body, {
      include: [Owner],
    });
    const puppyWithOwnerData = await Puppy.findById(newPuppy.id, {
      include: [Owner],
    });

    res.json(puppyWithOwnerData);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const puppy = await Puppy.findById(req.params.id);
    res.json(puppy);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const puppy = await Puppy.findById(req.params.id, { include: [Owner] });
    const updated = await puppy.update(req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const puppy = await Puppy.findById(req.params.id);
    await puppy.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
