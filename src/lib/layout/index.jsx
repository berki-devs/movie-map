import { Box, Container } from '@mui/material';
import Footer from './components/footer';
import Header from './components/header';

export const Layout = ({ children }) => {
  return (
    <Container maxWidth="lg">
      <Box className="relative min-h-[95vh]">
        <Header />
        <Box className="py-10">{children}</Box>
      </Box>
      <Footer />
    </Container>
  );
};
