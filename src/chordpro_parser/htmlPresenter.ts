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
      result += '<span class="song-line">'
      line.lyricChord.forEach((chord) => {
        if (chord.chord === '') {
          if (chord.lyric !== ' ') {
            result += '<span class="lyric">'
            result += chord.lyric
            result += '&nbsp;'
            result += '</span>'
          }
        } else {
          result += '<span class="lyric-chord">'

          result += '<code class="chord">'
          result += chord.chord
          result += '</code>'

          result += '<span class="chordLyrics">'
          result += chord.lyric
          result += '&nbsp;'
          result += '</span>'

          result += '</span>'
        }
      })
      result += '</span>'
    })
  })
  return result
}
