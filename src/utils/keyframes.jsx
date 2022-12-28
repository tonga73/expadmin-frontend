import { keyframes } from "@mui/material";

export const spin = keyframes`
    from {
    transform: rotate(0deg);
    }
    to {
    transform: rotate(360deg);
    }
`;

export const rotate = keyframes`
    from {
        transform: rotate(180deg);
    }
    to {
        transform: rotate(0deg);
    }
`;

export const pulse = keyframes`
0%, 100% {
  opacity: 1;
}
50% {
  opacity: .5;
}
`;
