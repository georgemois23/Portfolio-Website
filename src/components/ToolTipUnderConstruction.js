import { Tooltip, Icon, Box } from '@chakra-ui/react';
import { IoInformationCircle } from 'react-icons/io5';

export const ToolTipUnderConstruction = ({ where }) => {
  return (
    <Tooltip.Root openDelay={200} closeDelay={100}>
      <Tooltip.Trigger asChild>
        {/* Trigger must be focusable for accessibility, so we add a wrapper */}
        <Box 
          as="span" 
          display="inline-flex" 
          alignItems="center" 
          gap={1} 
          cursor="help"
        >
          <Icon as={IoInformationCircle} fontSize="18px" pb="0.5" /> 
          {where}
        </Box>
      </Tooltip.Trigger>
      
      {/* In v3, Content must be wrapped in Positioner for floating logic */}
      <Tooltip.Positioner>
        <Tooltip.Content bg='brand.dark.secondary' color='brand.dark.primary'>
          <Tooltip.Arrow />
          Page under construction 
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  );
};