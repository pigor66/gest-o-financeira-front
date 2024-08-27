import { Card } from "@mui/material"

 const Content = (props: { children: React.ReactNode }) => {
  return (
    <Card style={{ width: '100%' , padding: '1rem' }}>
      {props.children}
    </Card>

  )
}
export default  Content 
