import { Card, Flex } from '@chakra-ui/react'
import { Employee } from './Employees'

export const EmployeeDisplay = () => {
  return (
    <>
       <Flex alignItems="center" direction="column" wrap="wrap" gap={6} justify="center" top={20} px={4} >
        {Employee.map((Employee) => (
                <Card.Root
                  maxW={['100%', '45%', '30%', '22%']}
                  minW={['250px']}
                  overflow="hidden"
                >
                  <Card.Body gap="2">
                    <Card.Title>{Employee.name}</Card.Title>
                    <Card.Description>{Employee.salary < 50000 ? "Senior": "Entry Level"}</Card.Description>
                    <Card.Description>{Employee.salary}</Card.Description>
                  </Card.Body>
                </Card.Root>
              ))}
       </Flex>
    </>
  )
}

export default EmployeeDisplay
