import * as fs from 'fs'
import { Tag, Song, Line, LyricChord, Part } from '../chordproObjects'
import { parseSong } from '../songParser'

test('whole Song', () => {
  const file = fs.readFileSync('src/chordpro_parser/test/testsong.cho', 'utf-8')

  let tag1 = new Tag('title', 'Testsong')
  let tag2 = new Tag('artist', 'Benjamin Koderisch')

  let emptyLine = new Line([])
  let emptyPart = new Part('', [emptyLine])
  let chord1 = new LyricChord('Hallo', 'Em')
  let chord2 = new LyricChord(' du bist ', '')
  let chord3 = new LyricChord('', 'Am')
  let chord4 = new LyricChord(' ganz toll', '')
  let line1 = new Line([chord1, chord2, chord3, chord4])

  let line2 = new Line([new LyricChord('auf der Ganzen Welt', '')])
  let line3 = new Line([])
  let part1 = new Part('Chorus', [line1, line2, line3])

  let chord5 = new LyricChord('Und ich ', '')
  let chord6 = new LyricChord('liebe', 'Bm')
  let chord7 = new LyricChord(' dich ', '')
  let chord8 = new LyricChord('ganz', 'D')
  let chord9 = new LyricChord(' ', '')
  let chord10 = new LyricChord('doll', 'C')
  let chord11 = new LyricChord(' ', '')
  let chord12 = new LyricChord('fuer', 'F#')
  let chord13 = new LyricChord(' immer', '')
  let line4 = new Line([chord5, chord6, chord7, chord8, chord9, chord10, chord11, chord12, chord13])
  let part2 = new Part('Verse', [line4])

  let song = new Song([tag1, tag2], [emptyPart, part1, part2])

  expect(parseSong(file)).toStrictEqual(song)
})
