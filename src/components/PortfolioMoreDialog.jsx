import {
  Button,
  CloseButton,
  Dialog,
  Flex,
  HStack,
  Image,
  Portal,
  Stack,
  Text,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";
import Loading from "./Loading";
import { LuExternalLink, LuGithub } from "react-icons/lu";
import Skills from "./Skills";

const PortfolioMoreDialog = ({ open, onOpenChange, data }) => {
  
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;
  // const imageSrc = (isMobile && data?.mobile_image) ? data.mobile_image : data?.image;
  const imageSrc = data?.image;
  const hasExternalLinks = Boolean(data?.url || data?.github);

  const openExternal = (url) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

    if (!data && open) {
        return <Loading />;
    }
  return (
    <Dialog.Root
      open={open} 
      onOpenChange={onOpenChange}
      placement={'center'}
      motionPreset="slide-in-bottom"
    >
      <Portal>
        <Dialog.Backdrop backdropFilter="blur(7px)" />
        <Dialog.Positioner>
          <Dialog.Content
            bg="rgba(42, 28, 74, 0.96)"
            m={{ base: 2, md: 4 }}
            border="1px solid"
            borderColor="whiteAlpha.300"
            borderRadius="xl"
            userSelect="none"
            maxW={{ base: "96vw", md: "860px" }}
            maxH={{ base: "90vh", md: "92vh" }}
            overflow="hidden"
          >
            <Dialog.Header borderBottom="1px solid" borderColor="whiteAlpha.200" pb={3}>
              <Flex align="flex-start" justify="space-between" gap={3}>
                <Stack gap={2}>
                  <Dialog.Title color="brand.dark.text" lineHeight="1.2">
                    <Heading as="h3" fontSize={{ base: "lg", md: "xl" }}>
                      {data?.title || "Project Details"}
                    </Heading>
                  </Dialog.Title>

                  <Text color="brand.dark.secondary" fontSize={{ base: "xs", md: "sm" }} fontWeight="semibold">
                    {data?.from} — {data?.to}
                  </Text>

                  {hasExternalLinks && (
                    <HStack wrap="wrap" spacing={2} pt={1}>
                      {data?.url && (
                        <Button
                          size={{ base: "xs", md: "sm" }}
                          borderRadius="lg"
                          bg="rgba(145, 109, 232, 0.22)"
                          color="brand.dark.text"
                          border="1px solid"
                          borderColor="rgba(145, 109, 232, 0.45)"
                          onClick={() => openExternal(data.url)}
                        >
                          Website <LuExternalLink />
                        </Button>
                      )}
                      {data?.github && (
                        <Button
                          size={{ base: "xs", md: "sm" }}
                          borderRadius="lg"
                          bg="rgba(145, 109, 232, 0.22)"
                          color="brand.dark.text"
                          border="1px solid"
                          borderColor="rgba(145, 109, 232, 0.45)"
                          onClick={() => openExternal(data.github)}
                        >
                          GitHub <LuGithub />
                        </Button>
                      )}
                    </HStack>
                  )}
                </Stack>

                <Dialog.CloseTrigger asChild>
                  <CloseButton
                    size="md"
                    color="brand.dark.text"
                    _hover={{ bg: "whiteAlpha.100" }}
                    _active={{ bg: "whiteAlpha.200" }}
                    background="transparent"
                  />
                </Dialog.CloseTrigger>
              </Flex>
            </Dialog.Header>

            <Dialog.Body>
                <Stack direction="column" mb={4} gap={2}>
               {data?.from} — {data?.to}
               {imageSrc && (
                 <Image
                  src={imageSrc}
                  alt={data?.title}
                  mb={4}
                  borderRadius="xl"
                  w= {{ base: '100%', md: '80%', lg: '100%' }}
                  maxW={isMobile ? '95vw' : "800px"}
                  marginInline="auto"
                  objectFit="cover"
                  maxH= {{ sm: 'auto', base: '400px', lg: '500px' }}
                  cursor={data?.url ? "pointer" : "default"}
                  onClick={() => window.open(data.url, "_blank")}
                />
               )}
              <Text>
                {data?.description}
              </Text>
                </Stack>
              {data?.skills && <Skills skills={data.skills} />}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
export default PortfolioMoreDialog;