import { Box, Button, Flex, HStack, Image, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import img1 from "../assets/images/gallery/1.png";
import img2 from "../assets/images/gallery/2.png";
import img3 from "../assets/images/gallery/3.png";
import img4 from "../assets/images/gallery/4.png";
import img5 from "../assets/images/gallery/5.png";
import img6 from "../assets/images/gallery/6.png";
import img7 from "../assets/images/gallery/7.png";
import img8 from "../assets/images/gallery/8.png";
import img10 from "../assets/images/gallery/10.jpg";
import img11 from "../assets/images/gallery/11.jpg";
import img12 from "../assets/images/gallery/12.jpg";
import img13 from "../assets/images/gallery/13.jpg";
import img14 from "../assets/images/gallery/14.jpg";
// import AccessWithPin from "../../components/AccessWithPin";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const rika = [img1, img2, img3, img4, img5, img6, img7, img8];
const iro = [img10, img11, img12, img13, img14];
const mix = [img1, img10, img2, img11, img3, img12, img4, img13, img5, img14, img6, img7, img8];

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [Images, setImages] = useState(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (currentIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [currentIndex]);

  const openModal = (index) => setCurrentIndex(index);
  const closeModal = () => setCurrentIndex(null);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : Images.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < Images.length - 1 ? prev + 1 : 0));
  };

  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 3));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 1));
  // return (
  //   <AccessWithPin />
  // )
  return (
    <Flex justify="center" align="center" minH="100vh" direction="column">
      <Text as="h1" mb={4}>
        Gallery
      </Text>
      <HStack >
      <Button onClick={() => setImages(rika)}>
        Rika
      </Button>
      <Button  onClick={() => setImages(iro)}>
        Iro
      </Button>
      <Button  onClick={() => setImages(mix)}>
        Mix
      </Button>
      </HStack>
      {Images && (
      <Wrap spacing="30px" justify="center" p={10} maxW="1200px">
        {Images.map((src, i) => (
          <WrapItem key={i}>
            <Image
              src={src}
              alt={`Image ${i + 1}`}
              draggable={false}
              cursor="pointer"
              onClick={() => openModal(i)}
            />
          </WrapItem>
        ))}
      </Wrap>
      )}

      {/* Custom modal overlay */}
     {currentIndex !== null && (
  <Box
    position="fixed"
    top={0}
    left={0}
    w="100vw"
    h="100vh"
    bg="rgba(0,0,0,0.85)"
    display="flex"
    justifyContent="center"
    alignItems="center"
    zIndex={1000}
    onClick={closeModal}
  >
    <Box onClick={(e) => e.stopPropagation()} maxW="90vw" maxH="90vh">
      <TransformWrapper
        defaultScale={1}
         key={currentIndex}
        wheel={{ step: 0.1 }}
        pinch={{ step: 5 }}
        doubleClick={{ disabled: true }}
      >
        <TransformComponent>
          <Image
            src={Images[currentIndex]}
            maxH="80vh"
            w="auto"
            borderRadius="md"
            draggable={false}
          />
        </TransformComponent>
      </TransformWrapper>

      <Flex justify="space-between" mt={4}>
        <Button onClick={goToPrevious}>Previous</Button>
        <Button onClick={goToNext}>Next</Button>
        <Button onClick={closeModal} colorScheme="red">
          Close
        </Button>
      </Flex>
    </Box>
  </Box>
)}

    </Flex>
  );
};

export default Gallery;
