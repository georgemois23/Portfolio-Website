import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Textarea, Button, FormErrorMessage, Flex,Image, Box } from '@chakra-ui/react';
import emailjs from 'emailjs-com';
import { IoMdSend } from "react-icons/io";
import Imagesent from "../../src/assets/images/sent-mail1.gif"
import { scale } from 'framer-motion';
const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Name is required.';
    if (!form.email) newErrors.email = 'Email is required.';
    if (!form.message) newErrors.message = 'Message is required.';
    return newErrors;
  };

  const handleChange = (e) => {setForm({ ...form, [e.target.name]: e.target.value }); setErrors({ ...errors, [e.target.name]: '', [e.target.email]: '', [e.target.message]: ''});};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Send email using EmailJS
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
    <>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <FormControl isInvalid={errors.name} mb={4}>
            <FormLabel>Name</FormLabel>
            <Input name="name" value={form.name} onChange={handleChange} />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.email} mb={4}>
            <FormLabel>Email</FormLabel>
            <Input name="email" type="email" value={form.email} onChange={handleChange} />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.message} mb={4}>
            <FormLabel>Message</FormLabel>
            <Textarea name="message" value={form.message} onChange={handleChange} />
            <FormErrorMessage>{errors.message}</FormErrorMessage>
          </FormControl>

            <Button 
            type="submit" 
            bg="rgba(0, 10, 38, 0.95)" 
            color="brand.dark.text" 
            _hover={{ transform: "scale(1.05)" }} 
            width="100%"
          >
            <Flex alignItems="center" gap={2} justifyContent="center">
              {loading ? 'Sending...' : 'Send  '} <IoMdSend size={14} />
            </Flex>
          </Button>
          
        </form>
      ) : (
        <Flex justifyContent={'center'} flexDir={'column'} alignItems={'center'}>
        <p style={{ marginTop: "1rem", color: "brand.dark.secondary" }}>Your message has been sent successfully!</p>
        timeout {
        <Image src={Imagesent} alt="Success" width={{base:'100px'}} />
}
        </Flex>
      )}
    </>
  );
};

export default ContactForm;
