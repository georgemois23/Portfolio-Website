import { Flex, Text } from '@chakra-ui/react';

const SocialMediaLink = ({ icon: Icon, url, label }) => {
  const handleClick = () => {
    window.open(url, '_blank');
  };

  return (
    <Flex align="center" gap={1} onClick={handleClick} cursor="pointer">
      {Icon}
      <Text fontSize="sm" color="brand.dark.background" lineHeight="normal">
        {label}
      </Text>
    </Flex>
  );
};

export default SocialMediaLink;
