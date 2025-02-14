import express from 'express'
import { parseSong } from './chordpro_parser/songParser'
import { toHtml } from './chordpro_parser/htmlPresenter'
import fs from 'fs'

const app = express()

app.get('/', (req, res) => {
  const file = fs.readFileSync('src/chordpro_parser/test/testsong.cho', 'utf-8')
  const song = parseSong(file)
  const html = toHtml(song)
  res.send(html)
})

app.listen('3030', () => {
  console.log('Listen on 3030')
})
