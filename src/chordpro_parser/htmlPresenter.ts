import { Song } from './chordproObjects'
import fs from 'fs'

export function toHtml(song: Song): string {
  let cssfile = fs.readFileSync('src/chordpro_parser/css/formate.css')
  let html = `<!doctype html>
<html lang="de">
  <head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>ChordHub</title>
    <style> ${cssfile} </style>
  </head>
  <body>
    <p id="title">${song.title}</p>
    <p id="artist">${song.artist}</p>
<div class="song-line">
  <span class="lyric-chord">
    <span class="chord">A</span>
    <span class="lyric">This is </span>
  </span>
  <span class="lyric-chord">
    <span class="chord">B</span>
    <span class="lyric">my song</span>
  </span>
</div>
    <div id=textAndChords>${chordAndTextToHtml(song)}</div>
  </body>
</html>`
  return html
}

function chordAndTextToHtml(song: Song) {
  let result = ''
  song.parts.forEach((part) => {
    result += `<p id=partname>${part.name}</p>`
    part.lines.forEach((line) => {
      let lastPos = 0
      result += '<span class="song-line">'
      line.lyricChord.forEach((chord) => {
        result += '<span class="lyric-chord">'
        //result += `<p id=chord>${chord.chord}</p>`
        //result += `<p id=lyrics>${line.lyrics.substring(lastPos - 1, chord.lyric)}</p>`
        result += '</span>'
        //lastPos = chord.chord.length + chord.lyric
      })
      result += '</span>'
    })
  })
  return result
}
