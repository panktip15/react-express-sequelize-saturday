const { db, Puppy, Owner } = require('./db');

const seed = async () => {
  await db.sync({ force: true });

  const [pankti, hari] = await Promise.all([
    Owner.create({
      name: 'Pankti Parikh',
    }),
    Owner.create({
      name: 'Hari Doshi',
    }),
  ]);

  const [nayna, cody, snowflake] = await Promise.all([
    Puppy.create({
      name: 'nayna doshi',
      imageUrl:
        'https://designerdoginfo.files.wordpress.com/2013/01/puggle-puppy-4.jpg?w=584',
      likes: 4,
      ownerId: pankti.id,
    }),
    Puppy.create({
      name: 'cody cools',
      imageUrl: 'https://www.askideas.com/media/19/Papillon-Puppy-Looking.jpg',
      likes: 6,
      ownerId: hari.id,
    }),
    Puppy.create({
      name: 'snowflakes sweetie',
      imageUrl:
        'http://4.bp.blogspot.com/-3JeIxWBU7bY/UKjIt8lVpCI/AAAAAAAABx8/YM8piSOwczs/s1600/Schipperke-Puppy.jpg',
      likes: 2,
      ownerId: hari.id,
    }),
  ]);
  console.log('Finished');
  db.close();
};

seed().catch(err => {
  console.error('err!', err);
  db.close();
});
