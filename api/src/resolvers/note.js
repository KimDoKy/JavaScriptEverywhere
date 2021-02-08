module.exports = {
    author: async (note, args, { models }) => {
        const author = await models.User.findById(note.author);
        // return await models.User.findById(note.author);
        console.log(typeof(author), typeof(author.username));
        return author;
    },
    favoritedBy: async (note, args, { models }) => {
        return await models.User.find({ _id: { $in: note.favoritedBy } });
    }
};
