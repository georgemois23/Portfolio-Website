import {
  Button,
  CloseButton,
  Dialog,
  Image,
  Portal,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Loading from "./Loading";
import { LuExternalLink, LuGithub } from "react-icons/lu";
import Skills from "./Skills";

const PortfolioMoreDialog = ({ open, onOpenChange, data }) => {
  
   const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;
  //  const imageSrc = (isMobile && data?.mobile_image) ? data.mobile_image : data?.image;
   const imageSrc = data?.image;
    if (!data && open) {
        return <Loading />; // or any fallback UI
    }
  return (
    <Dialog.Root
      // 2. Connect the props to the Root component
      open={open} 
      onOpenChange={onOpenChange}
      placement={'center'}
      motionPreset="slide-in-bottom"
    >
      {/* 3. Removed Dialog.Trigger (controlled by parent) */}
      
      <Portal>
        <Dialog.Backdrop backdropFilter="blur(7px)" />
        <Dialog.Positioner>
          <Dialog.Content bgColor={"brand.dark.secondary"} m={4} border={'none'} borderRadius={'xl'} userSelect={'none'}>
           <Dialog.Header>
  <Stack
    direction="row"
    alignItems="center"
    justifyContent="space-between"
  >
    <Dialog.Title
      color="white"
      display="flex"
      alignItems="center"
      lineHeight="1"
    >
      {data?.url ? (
         <Text
      display={"flex"}
        gap={4}
        flexDirection={"column"}
    >
      {data?.title || "Project Details"}
      <Stack direction={'row'}>
      <Button w={'fit-content'} borderRadius={'xl'} bgColor={"brand.dark.background"} onClick={() => window.open(data.url, "_blank")} _hover={{}} _active={{}} _focus={{}}>
        Website<LuExternalLink p={0} /></Button>
      <Button w={'fit-content'} borderRadius={'xl'} bgColor={"brand.dark.background"} onClick={() => window.open(data.github, "_blank")} _hover={{}} _active={{}} _focus={{}}>
        Github<LuGithub p={0} /></Button>
        </Stack>
    </Text>
      ) : (
        data?.title || "Project Details"
      )}
    </Dialog.Title>

    <Dialog.CloseTrigger asChild>
       <CloseButton size="md"color="white" pt={2} _hover={{}} _active={{}} _focus={{}}
    background="none"
  />
    </Dialog.CloseTrigger>
  </Stack>
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
                  maxW={isMobile ? '70vw' : "800px"}
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