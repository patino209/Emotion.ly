import React, { useState } from 'react';
import {
  Flex,
  Text,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Alert,
  AlertIcon,
  useClipboard,
} from '@chakra-ui/react';

import { AutoResizeTextarea } from './ResizableTextarea';

const BASE_INFO = {
  irate: {
    base: 'anger',
    color: 'teal',
    words: {
      irate: 'Feeling or showing extreme anger',
      mad: 'Roused to anger',
    },
  },
};

function App() {
  const [sliderValue, setSliderValue] = useState(50);
  const [data, setData] = useState();
  const [base, setBase] = useState();
  const [color, setColor] = useState();
  const [emoji, setEmoji] = useState();
  const [words, setWords] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const { onCopy, value, setValue, hasCopied } = useClipboard('');

  const labelStyles = {
    mt: '5',
    ml: '-2.5',
    fontSize: 'lg',
  };

  const setScaleData = () => {
    setData(BASE_INFO);
    console.log(value);
    setBase(Object.keys(BASE_INFO)[0]);

    // eslint-disable-next-line default-case
    switch (BASE_INFO.irate.base) {
      case 'anger':
        setEmoji('😡');
        break;
      case 'sadness':
        setEmoji('🙁');
        break;
      case 'disgust':
        setEmoji('🤢');
        break;
      case 'fear':
        setEmoji('😱');
        break;
      case 'surprise':
        setEmoji('😲');
        break;
      case 'joy':
        setEmoji('😁');
        break;
    }

    setColor(BASE_INFO.irate.color);
    setWords(BASE_INFO.irate.words);
  };

  const request = e => {
    e.preventDefault();
    console.log('Request had been sent');
    if (value) {
      setScaleData();
    } else {
      setData(undefined);
      setBase('');
      setEmoji('');
      setColor('');
      setWords({});
      setErrorMsg('Please, type your sentence!');
    }
  };

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      mt={10}
      w={{ base: '95%', md: '90%', xl: '1024px' }}
      ml="auto"
      mr="auto"
    >
      <AutoResizeTextarea
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Put your sentence here"
        size="lg"
        fontSize="5xl"
      />
      <Flex>
        <Button colorScheme="teal" size="lg" mt="10" onClick={request}>
          Find adjectives
        </Button>

        <Button colorScheme="teal" size="lg" ml="10" mt="10" onClick={onCopy}>
          {hasCopied ? 'Copied!' : 'Copy'}
        </Button>
      </Flex>

      {data ? (
        <Flex w="100%" mt="16" px="10" direction="column">
          <Slider
            aria-label="slider-ex-6"
            onChange={val => setSliderValue(val)}
            colorScheme={color}
            min={1}
            max={19}
            step={1}
          >
            <SliderMark value={1} {...labelStyles}>
              Less Intense
            </SliderMark>
            <SliderMark value={10} {...labelStyles}>
              Your Word
            </SliderMark>
            <SliderMark value={19} {...labelStyles}>
              More Intense
            </SliderMark>
            <SliderMark
              value={sliderValue}
              textAlign="center"
              bg={color}
              color="white"
              mt="-12"
              ml="-6"
              w="12"
            >
              {sliderValue}%
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb
              position="relative"
              right={-10}
              boxSize={10}
              borderColor={color}
              ml={-5}
            >
              <Text color={color}>{emoji}</Text>
            </SliderThumb>
          </Slider>

          <Flex direction="row" justify="left" align="center" mt="20">
            <Text fontSize="4xl">
              <Text as="b">Definition: </Text>
              {BASE_INFO.irate.words.irate}
            </Text>
          </Flex>
        </Flex>
      ) : null}

      {errorMsg ? (
        <Alert status="error" borderRadius={10} fontSize="4xl" mt="10">
          <AlertIcon boxSize={14} />
          {errorMsg}
        </Alert>
      ) : null}
    </Flex>
  );
}

export default App;
