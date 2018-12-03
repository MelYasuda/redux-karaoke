const songList = {
    1: "Don't want to be a fool for you, Just another player in your game for two, You may hate me but it ain't no lie, Baby bye bye bye, Bye bye, I Don't want to make it tough, I just want to tell you that I've had enough, It might sound crazy but it ain't no lie, Baby bye bye bye".split(', '),
    2: "Twenty-five years and my life is still, Trying to get up that great big hill of hope, For a destination, I realized quickly when I knew I should, That the world was made up of this brotherhood of man, For whatever that means, And so I cry sometimes when I'm lying in bed, Just to get it all out what's in my head, And I, I am feeling a little peculiar, And so I wake in the morning and I step outside, And I take a deep breath and I get real high, and I Scream from the top of my lungs, What's going on?, And I say hey yeah yeah hey yeah yeah, I said hey what's going on?, And I say hey yeah yeah hey yeah yeah,I said hey what's going on?".split(', ')
  };

// INITIAL REDUX STATE
const initialState = {
    currentSongId: null,
    songsById: {
      1: {
        title: "Bye Bye Bye",
        artist: "N'Sync",
        songId: 1,
        songArray: songList[1],
        arrayPosition: 0,   
      },
      2: {
        title: "What's Goin' On",
        artist: "Four Non-Blondes",
        songId: 2,
        songArray: songList[2],
        arrayPosition: 0,
      }
    }
  };

const lyricChangeReducer = (state = initialState.songsById, action) => {
    let newArrayPosition;
    let newSongsByIdEntry;
    let newSongsByStateSlice;
    let newState;
    switch (action.type) {
        case 'NEXT_LYRIC':
            newArrayPosition = state[action.currentSongId].arrayPosition+1;
            newSongsByIdEntry= Object.assign({}, state[action.currentSongId], {
                arrayPosition: newArrayPosition,
            })
            newSongsByStateSlice = Object.assign({}, state, {
                [action.currentSongId]: newSongsByIdEntry
            });
            return newSongsByStateSlice;
        case 'RESTART_SONG':
            newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
                arrayPosition: 0
            })
            newSongsByStateSlice = Object.assign({}, state, {
                [action.currentSongId]: newSongsByIdEntry
            });
            return newSongsByStateSlice;
        default:
            return state;
    }
}

const songChangeReducer = (state = initialState.currentSongId, action) => {
    switch (action.type) {
        case 'CHANGE_SONG':
            return action.newSelectedSongId;
        default: 
            return state;
    }
}


// const renderLyrics = () => {
//     const lyricsDisplay = document.getElementById('lyrics');
//     while (lyricsDisplay.firstChild) {
//         lyricsDisplay.removeChild(lyricsDisplay.firstChild);
//     }

//     const currentLine = store.getState().songLyricsArray[store.getState().arrayPosition];
//     const renderedLine = document.createTextNode(currentLine);
//     document.getElementById('lyrics').appendChild(renderedLine);
// }

// window.onload = function() {
//     renderLyrics();
//   }


// const { createStore } = Redux;
// const store = createStore(lyricChangeReducer);

// console.log(store.getState());


// const userClick = () => {
//     const currentState = store.getState();
//     if (currentState.arrayPosition === currentState.songLyricsArray.length - 1) {
//         store.dispatch( { type: 'RESTART_SONG' } );
//     } else {
//         store.dispatch({type: 'NEXT_LYRIC'});        
//     }
//     console.log(store.getState());
// }
// store.subscribe(renderLyrics);

const {expect} = window;

expect(lyricChangeReducer(initialState.songsById, {type: null})).toEqual(initialState.songsById);
expect(lyricChangeReducer(initialState.songsById, {type: 'NEXT_LYRIC' ,  currentSongId: 2})).toEqual({
    1: {
        title: "Bye Bye Bye",
        artist: "N'Sync",
        songId: 1,
        songArray: songList[1],
        arrayPosition: 0,
      },
      2: {
        title: "What's Goin' On",
        artist: "Four Non-Blondes",
        songId: 2,
        songArray: songList[2],
        arrayPosition: 1,
      }
});

expect(lyricChangeReducer(initialState.songsById,{ type: 'RESTART_SONG', currentSongId:2 })).toEqual({
    1: {
        title: "Bye Bye Bye",
        artist: "N'Sync",
        songId: 1,
        songArray: songList[1],
        arrayPosition: 0,
      },
      2: {
        title: "What's Goin' On",
        artist: "Four Non-Blondes",
        songId: 2,
        songArray: songList[2],
        arrayPosition: 0,
      }
});

expect(songChangeReducer(initialState, { type: null })).toEqual(initialState);
expect(songChangeReducer(initialState.currentSongId, { type: 'CHANGE_SONG', newSelectedSongId: 1 })).toEqual(1);

