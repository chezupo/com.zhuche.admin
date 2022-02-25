import React, { useState } from 'react'
import { APILoader, HawkEyeControl, Map, Marker, useMapContext } from '@uiw/react-amap'
import CompleteInput, { CompleteInputPropsType } from '@/components/MapSearchComplete/CompleteInput'
import { useAppSelector } from '@/store/hooks'

const MapSearchComplete: React.FC<CompleteInputPropsType> = (props) => {
  const {state} = useMapContext()

  const [location, setLocation] = useState<AMap.LngLat | null>(null)
  const handleClick = (e: AMap.MapsEvent)  => {
    e.type === "click" && setLocation(e.lnglat)
  }
  const [zoom, setZoom] = useState<number>(4)
  const handleChangeLocation = (newAddress: AddressType) => {
    setLocation(new AMap.LngLat(newAddress.lng, newAddress.lat))
    setZoom(14)
    props.onChange && props.onChange(newAddress)
  }
  const amapKey = useAppSelector(state => state.configuration.amapKey)

  return (
    <div style={{width: '100%', height: 400}}>
      { amapKey &&
      <APILoader
        akay={amapKey}
      >
        <div style={{ width: '100%', height: '18rem' }}>
          <CompleteInput
            onChange={handleChangeLocation}
            value={props.value}
          />
          <Map
            zoom={zoom}
            onClick={handleClick}
            center={location ? location : undefined}
          >
            <Marker visiable={!!location} position={location!} />
            <HawkEyeControl
              offset={[50, 10]}
            />
          </Map>
        </div>
      </APILoader>
      }
    </div>

  );
}

export default MapSearchComplete
