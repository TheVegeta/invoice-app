import { css } from "@emotion/css";
import type { Sx } from "@mantine/core";
import { Box, Image } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import AppLogo from "../../assets/logo.png";
import ProfileImg from "../../assets/profile.jpg";

const AppNavbar: FC<{ isBigScreen: boolean }> = ({ isBigScreen }) => {
  const [currentStyle, setCurrentStyle] = useState<Sx>({});

  useEffect(() => {
    if (isBigScreen) {
      setCurrentStyle({
        width: "auto",
        height: "100vh",
        borderRadius: "0rem 1.5rem 1.5rem 0rem",
        flexDirection: "column",
        position: "fixed",
      });
    } else {
      setCurrentStyle({
        width: "100vw",
        height: "auto",
        borderRadius: "unset",
      });
    }
  }, [isBigScreen]);

  return (
    <Box
      bg={"#373b53"}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 222222,
        ...currentStyle,
      }}
    >
      <Box>
        <Image src={AppLogo} />
      </Box>
      <Box
        sx={{ borderRadius: "50%", overflow: "hidden" }}
        mb={isBigScreen ? "md" : "unset"}
        mr={isBigScreen ? "unset" : "md"}
        className={css`
          margin-right: 1.5rem;

          @media (min-width: 767px) {
            margin-right: 5rem;
          }

          @media (min-width: 1023px) {
            margin-right: unset;
          }
        `}
      >
        <Image width="4rem" src={ProfileImg} />
      </Box>
    </Box>
  );
};

export default AppNavbar;
