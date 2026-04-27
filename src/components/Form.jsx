import React, { useState } from 'react';
import { Input, Textarea, Button, Flex, Text, Field } from '@chakra-ui/react';
import ResizeTextarea from "react-textarea-autosize";
import emailjs from 'emailjs-com';
import { IoMdSend } from "react-icons/io";
import MailSuccess from './GifSuccess';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const allGood = form.name && form.email && form.message.length >= 2;

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Name is required.';
    if (!form.email) newErrors.email = 'Email is required.';
    if (!form.message) newErrors.message = 'Message is required.';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Simplified error clearing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        setLoading(true);
        const response = await emailjs.send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          form,
          process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        );

        if (response.status === 200) {
          setSubmitted(true);
          setForm({ name: '', email: '', message: '' });
          setLoading(false);
        } else {
          alert("The submission failed. Please try again.");
          setLoading(false);
        }
      } catch (error) {
        alert("The submission failed. Please try again.");
        console.error(error);
        setLoading(false);
      }
    }
  };

  return (
    <Flex w="100%" maxW={{ base: "100%", md: "500px" }} minH="350px" justifyContent="center">
      {!submitted ? (
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          
          {/* NAME FIELD */}
          <Field.Root invalid={!!errors.name} mb={4}>
            <Field.Label color="brand.dark.text">Name</Field.Label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              bg="rgba(255,255,255,0.01)"
              borderColor="rgba(145, 109, 232, 0.5)"
              color="brand.dark.text"
              _placeholder={{ color: "whiteAlpha.700" }}
              _focusVisible={{ borderColor: "brand.dark.secondary", boxShadow: "none" }}
            />
            <Field.ErrorText>{errors.name}</Field.ErrorText>
          </Field.Root>

          {/* EMAIL FIELD */}
          <Field.Root invalid={!!errors.email} mb={4}>
            <Field.Label color="brand.dark.text">Email</Field.Label>
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              bg="rgba(255,255,255,0.01)"
              borderColor="rgba(145, 109, 232, 0.5)"
              color="brand.dark.text"
              _placeholder={{ color: "whiteAlpha.700" }}
              _focusVisible={{ borderColor: "brand.dark.secondary", boxShadow: "none" }}
            />
            <Field.ErrorText>{errors.email}</Field.ErrorText>
          </Field.Root>

          {/* MESSAGE FIELD */}
          <Field.Root invalid={!!errors.message} mb={4}>
            <Field.Label color="brand.dark.text">Message</Field.Label>
            <Textarea 
              as={ResizeTextarea} 
              name="message" 
              value={form.message} 
              minH="140px"
              overflow="hidden" 
              onChange={handleChange} 
              bg="rgba(255,255,255,0.01)"
              borderColor="rgba(145, 109, 232, 0.5)"
              color="brand.dark.text"
              _placeholder={{ color: "whiteAlpha.700" }}
              _focusVisible={{ borderColor: "brand.dark.secondary", boxShadow: "none" }}
            />
            <Field.ErrorText>{errors.message}</Field.ErrorText>
          </Field.Root>

          <Button
            type="submit"
            bg="brand.dark.background"
            color="brand.dark.text"
            border="1px solid"
            borderColor="rgba(145, 109, 232, 0.6)"
            _hover={{ bg: "rgba(145, 109, 232, 0.28)" }}
            width="100%"
            disabled={loading || !allGood} // Good practice to disable button while sending
            _disabled={{ opacity: 0.6, cursor: 'not-allowed' }}
          >
            <Flex alignItems="center" gap={2} justifyContent="center">
              {loading ? 'Sending...' : 'Send  '} <IoMdSend size={14} />
            </Flex>
          </Button>

        </form>
      ) : (
        <Flex justifyContent={'center'} flexDir={'column'} alignItems={'center'} gap={4}>
          <Text fontSize={{ base: "md", md: "lg" }} mt="1rem" color="brand.dark.secondary" fontWeight={800} textAlign="center">
            Your message has been sent successfully!
          </Text>
          <Text as="caption" fontSize={{ base: "xs", md: "sm" }} fontWeight={300} mb={4} color="brand.dark.text" opacity={0.85} textAlign="center">
            I will get back to you as soon as possible.
          </Text>
          {/* <Text as="a"
            href="mailto:george@moysiadis.dev" fontWeight={600} mb={4} pt={2}>
            If you have more questions, feel free to send an email here
          </Text> */}

          <MailSuccess />
        </Flex>
      )}
    </Flex>
  );
};

export default ContactForm;