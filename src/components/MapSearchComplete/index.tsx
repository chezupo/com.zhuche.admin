import React, { useState } from 'react'
import { APILoader, HawkEyeControl, Map, Marker } from '@uiw/react-amap'
import CompleteInput, { CompleteInputPropsType, getAddress } from '@/components/MapSearchComplete/CompleteInput'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import axios from 'axios'
import { convertAddressLocation } from '@/components/MapSearchComplete/CompleteInput/InputRender'
import { getAreasThunk, getCitiesThunk } from '@/store/modules/division'

const MapSearchComplete: React.FC<CompleteInputPropsType> = (props) => {
  const [location, setLocation] = useState<AMap.LngLat | null>(null)
  const amapSearchKey = useAppSelector(state => state.configuration.amapSearchKey)
  const dispatch = useAppDispatch()
  const handleClick = async (e: AMap.MapsEvent)  => {
    if (e.type === "click") {
      const lat = e.lnglat.getLat!()
      const lng = e.lnglat.getLng!()
      const res = await axios.get(
        `https://restapi.amap.com/v3/geocode/regeo?output=json&location=${lng},${lat}&key=${amapSearchKey}&extensions=base`
      )
      if (res.status === 200 && res.data.info === "OK") {
        const address = res.data.regeocode.formatted_address as string
        const newAddress = await getAddress(address, amapSearchKey)
        if (newAddress.length > 0) {
          const selectedAddress: AddressType = {...newAddress[0], lat, lng}
          const resAddress = await convertAddressLocation(selectedAddress)
          handleChangeLocation(resAddress)
        }
      }
    }
  }
  const [zoom, setZoom] = useState<number>(12)
  const handleChangeLocation = (newAddress: AddressType) => {
    if (newAddress.lat && newAddress.lng) {
      setLocation(new AMap.LngLat(newAddress.lng, newAddress.lat))
      setZoom(14)
    }
    props.onChange && props.onChange(newAddress as AddressType)
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
