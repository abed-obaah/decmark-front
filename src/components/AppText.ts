import styled from "@src/constants/styled-components";
import { SIZES } from "@src/constants/theme";
import { COLORS } from "@src/constants/theme";

export const XtraLargeText = styled.Text`
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-size: ${SIZES.xl}px;
  /* font-family: "FONT_SEMI_BOLD"; */
`;

export const LargeText = styled.Text`
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-size: ${SIZES.lg}px;
  /* font-family: "FONT_SEMI_BOLD"; */
`;

export const MediumText = styled.Text`
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  font-size: ${SIZES.md}px;
`;

export const SmallText = styled.Text`
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  font-size: ${SIZES.sm}px;
`;

export const LinkText = styled.Text`
  color: ${({ theme }) => theme.GOLDEN_TEXT};
  /* font-family: "FONT_SEMI_BOLD"; */
`;

export const ErrorText = styled.Text`
  color: ${COLORS.red};
`;
