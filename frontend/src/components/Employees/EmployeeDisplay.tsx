
// import { Employee } from '../../../../backend/src/routes/employee'
import { Employee } from './Employees'
import { Card, Flex } from '@chakra-ui/react'

export const EmployeeDisplay = () => {
  return (
    <>
      <Flex
        alignItems="center"
        direction="column"
        wrap="wrap"
        gap={6}
        justify="center"
        top={20}
        px={4}
      >
        {Employee.map((Employee) => (
          <Card.Root
            maxW={['100%', '45%', '30%', '22%']}
            minW={['250px']}
            overflow="hidden"
          >
            <Card.Body gap="2">
              <Card.Title>{Employee.name}</Card.Title>
              <Card.Description>
                {Employee.salary < 50000 ? 'Entry Level' : 'Senior'}
              </Card.Description>
            </Card.Body>
          </Card.Root>
        ))}
      </Flex>
    </>
  )
}

export default EmployeeDisplay
