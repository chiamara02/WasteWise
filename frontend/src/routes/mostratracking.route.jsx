import PageHeading from '../components/pageHeading.component'
import TrackingProgress from '../components/trackingProgress.component'
import { getPercorsi } from '../utils/requests'
import { Link, Navigate, useLocation, useLoaderData } from "react-router-dom"
import { useState, useEffect } from 'react'


export default function Percorsi() {

  return (
    <div className="p-5">
      <PageHeading title={"Tracking veicoli di raccolta"} />
        <TrackingProgress percorso={null} zona={"zona account"} hasControls={false} />
    </div>
  )
}
