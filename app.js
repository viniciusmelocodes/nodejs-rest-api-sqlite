const express = require('express');
const Playlist = require('./playlist');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server Listening on port:", port);
});

app.get('/all-playlists', async (request, response) => {
    try {
        const playlists = await Playlist.findAll();
        response.send(playlists);
    } catch (error) {
        console.log(error);
    }
});

app.get('/get-playlist/:id', async (request, response) => {
    try {
        const playlist = await Playlist.findByPk(request.params.id);

        if (playlist == null) {
            return response.send({ 'message': 'Playlist não encontrada.' });
        }

        response.send(playlist);
    } catch (error) {
        console.log(error);
    }
});