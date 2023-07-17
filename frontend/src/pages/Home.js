import React from 'react'
import {  Center,Square ,Box,Flex , Text, Spacer} from '@chakra-ui/react'
import { AtSignIcon, SearchIcon } from '@chakra-ui/icons'
import { Container, VStack } from '@chakra-ui/react'
import { Input , InputLeftElement, InputGroup, Button} from '@chakra-ui/react'
import axios from 'axios';

import  { useEffect, useState } from 'react';

const Home = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
          const response = await axios.get('localhost:4000/api/category/get'); // Replace with your API URL
          setData(response.data);

  
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };



      useEffect(() => {
        fetchData();
      }, []);

  return (
    <div>

<Box bg='purple' w='90%' h={50} p={1} color='white'>
<Flex>
  <Box p='4' >
   <Text>Digitalflake</Text>
  </Box>
  <Spacer />
  <Box p='4'>
  <AtSignIcon />
  </Box>
</Flex>
 
</Box>



<VStack>
<Container maxW='container.sm'  >

<Flex>
 
  <Box p='4' color={'#000000'}>
   Category
  </Box>
  <Spacer />
  <Box p='4' >

  <InputGroup h={30} w={500}>
    <InputLeftElement pointerEvents='none' h={30} w={20}>
      <SearchIcon color='gray.200' />
    </InputLeftElement>
    <Input type='tel' placeholder='' />
  </InputGroup>


  </Box>
  <Box p='4'>
  <Button colorScheme='purple' h={10}>Add New</Button>
  </Box>
  <Spacer />
 
</Flex>

  </Container>
  
  <Box bg='#f4c430' w='90%' p={4} color='black' display="flex" padding={5} justifyContent="space-around">
   <Text>ID</Text>
   <Text>Name</Text>
   <Text>Description</Text>
   <Text>Status</Text>
    </Box>





 
</VStack>
      
    </div>
  )
}

export default Home
