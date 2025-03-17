import { Card, Image, Flex } from '@chakra-ui/react'
import { Achievement } from './Achievement'

export const AchievementDisplay = () => {
  return (
    <Flex direction="row" wrap="wrap" gap={6} justify="center" px={4}>
      {Achievement.map((Achievement) => (
        <Card.Root
          maxW={['100%', '45%', '30%', '22%']}
          minW={['250px']}
          overflow="hidden"
        >
          <Image
            src={Achievement.img}
            alt={Achievement.title}
            height={['150px']}
          />
          <Card.Body gap="2">
            <Card.Title>{Achievement.title}</Card.Title>
            <Card.Description>{Achievement.description}</Card.Description>
          </Card.Body>
        </Card.Root>
      ))}
    </Flex>
  )
}

export default AchievementDisplay
