import { parseLine } from '../lineParser'
import { Line, LyricChord, PartOpenTag } from '../chordproObjects'

test('line with just text', () => {
  let line = new Line([new LyricChord('Test')])
  expect(parseLine('Test')).toStrictEqual(line)
})

test('line with text and chord', () => {
  let lyricChord = new LyricChord('Test', 'Em')
  let line = new Line([lyricChord])
  let res = parseLine('[Em]Test')
  expect(res).toStrictEqual(line)
})

test('line with text and two chords', () => {
  let lyricChord = new LyricChord('Test', 'Em')
  let whitespace = new LyricChord(' ', '')
  let chord2 = new LyricChord('Hallo', 'Am')
  let line = new Line([lyricChord, whitespace, chord2])
  expect(parseLine('[Em]Test [Am]Hallo')).toStrictEqual(line)
})

test('line with tag', () => {
  let tag = new PartOpenTag('comment')
  expect(parseLine('{c: comment}')).toStrictEqual(tag)
})

test('line is comment', () => {
  expect(parseLine('#comment')).toStrictEqual(null)
})

test('line is open tag for chorus', () => {
  let line = new PartOpenTag('soc')
  expect(parseLine('{soc}')).toStrictEqual(line)
  expect(line.name).toBe('Chorus')
})
