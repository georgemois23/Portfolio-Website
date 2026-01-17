import React, { useState } from "react";
import { Box, Button, HStack, PinInput, Text } from "@chakra-ui/react";

const AccessWithPin = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pin, setPin] = useState(["", "", "", ""]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setPin(["", "", "", ""]);
    setIsOpen(false);
  };

  const handleChange = (value, index) => {
    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);
  };

  const handleSubmit = (e) => {
    // onSubmit(pin.join(""));
    if(pin.join("")==="1234"){
      alert("Access Granted!");
    }
    closeModal();
  };

  return (
    <>
      <Button colorScheme="blue" onClick={openModal}>
        Enter PIN
      </Button>

      {isOpen && (
        <Box
          position="fixed"
          top={0}
          left={0}
          w="100vw"
          h="100vh"
          bg="rgba(0,0,0,0.6)"
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex={1000}
          onClick={closeModal}
        >
          <Box
            bg="white"
            p={6}
            borderRadius="md"
            minW="300px"
            onClick={(e) => e.stopPropagation()}
          >
            <Text fontSize="lg" mb={4} textAlign="center">
              Enter Your 4-Digit PIN
            </Text>

            <HStack justify="center" mb={4}>
              <PinInput.Root>
                <PinInput.HiddenInput />
                <PinInput.Control>
                  {pin.map((digit, i) => (
                    <PinInput.Input
                      key={i}
                      index={i}
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, i)}
                      size="lg"
                      textAlign="center"
                    />
                  ))}
                </PinInput.Control>
              </PinInput.Root>
            </HStack>

            <HStack justify="center" spacing={4}>
              <Button
                colorScheme="blue"
                onClick={handleSubmit}
                isDisabled={pin.some((d) => d === "")}
              >
                Submit
              </Button>
              <Button variant="outline" onClick={closeModal}>
                Cancel
              </Button>
            </HStack>
          </Box>
        </Box>
      )}
    </>
  );
};

export default AccessWithPin;
