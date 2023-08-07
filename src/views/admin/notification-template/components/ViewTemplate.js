import Card from 'components/card/Card'
import React from 'react'
import { useParams } from 'react-router-dom'
import DataFetcher from './DataFetcher'

export default function  ViewTemplate() {

  const {id} = useParams()
  console.log(id)
  return (
    <Card>
    <div>ViewTemplate</div>
    <div></div>
    </Card>
  )
}
