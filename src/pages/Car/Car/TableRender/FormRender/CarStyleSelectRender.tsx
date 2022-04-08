import React, {useEffect, useState} from "react";
import {Select} from "antd";
import {fetchCarCategory} from "@/api/carCategory";

type CarStyleSelectRenderPropsType = {
  value?: CarCategoryItemType
  onChange?: (newValue: CarCategoryItemType)  => void
}
const idMapCarCategory = new Map<number, CarCategoryItemType>()
const CarStyleSelectRender: React.FC<CarStyleSelectRenderPropsType> = props => {
  const [carCategories, setCarCategories] = useState<CarCategoryItemType[]>([])
  useEffect(() => {
    let isMounted = true
    if (carCategories.length === 0) {
      fetchCarCategory().then(res => {
        if (isMounted) {
          setCarCategories(res.list);
          res.list.forEach(el => idMapCarCategory.set(el.id, el))
        }
      })
    }
    return () => {
      isMounted = false
    }
  }, [])
  const handleChange = (id: number) => {
    const newValue = idMapCarCategory.get(id);
    props.onChange && props.onChange(newValue!)
  }

  return (<>

    <Select
      {...(props.value ?  {value: props.value.id} : {})}
      onChange={v => handleChange(v) }
    >
      {
        carCategories.map(el =>
          <Select.Option
            value={el.id}
            key={el.id}
          >{el.name}</Select.Option>
        )
      }
    </Select>
  </>)

}

export default CarStyleSelectRender
