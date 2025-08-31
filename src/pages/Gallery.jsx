import {
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import img1 from "../assets/images/gallery/1.png";
import img2 from "../assets/images/gallery/2.png";
import img3 from "../assets/images/gallery/3.png";
import img4 from "../assets/images/gallery/4.png";
import img5 from "../assets/images/gallery/5.png";
import img6 from "../assets/images/gallery/6.png";
import img7 from "../assets/images/gallery/7.png";
import img8 from "../assets/images/gallery/8.png";
import { useState } from "react";

const OpenModal = ({ images, currentIndex, isOpen, onClose, setCurrentIndex }) => {
  if (currentIndex === null) return null;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter= 'blur(8px)' />
      <ModalContent bg={'black'} border={`1px solid white`} p={1}>
        <ModalCloseButton />
        <ModalBody pb={6} textAlign="center" >
          <Image src={images[currentIndex]} maxH="70vh" mx="auto" display={'block'} w={'auto'}   draggable='false' marginY={6} />
          <Flex justify="space-between" mt={4}>
            <Button onClick={goToPrevious}>Previous</Button>
            <Button onClick={goToNext}>Next</Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const Gallery = () => {
  const Images = [img1, img2, img3, img4, img5, img6, img7, img8];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentIndex, setCurrentIndex] = useState(null);

  return (
    <Flex justify="center" align="center" minH="100vh" direction="column">
      <Text as="h1" mb={4}>
        Gallery
      </Text>
      <Wrap spacing="30px" justify="center" p={10} maxW="1200px">
        {Images.map((src, i) => (
          <WrapItem key={i}>
            <Image
              src={src}
              alt={`Image ${i + 1}`}
              draggable='false'
              cursor="pointer"
              onClick={() => {
                setCurrentIndex(i);
                onOpen();
              }}
            />
          </WrapItem>
        ))}
      </Wrap>

      <OpenModal
        images={Images}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Flex>
  );
};

export default Gallery;
