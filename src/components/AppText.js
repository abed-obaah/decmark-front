import styled from 'styled-components/native';
import { SIZES } from '../constants/theme';

export const XtraLargeText = styled.Text`
  color: ${({theme}) => theme.PRIMARY_TEXT_COLOR};
  font-size: ${SIZES.xl}px;
  font-weight: bold;
`

export const LargeText = styled.Text`
  color: ${({theme}) => theme.PRIMARY_TEXT_COLOR};
  font-size: ${SIZES.lg}px;
  font-weight: bold;
`

export const MediumText = styled.Text`
  color: ${({theme}) => theme.SECONDARY_TEXT_COLOR};
  font-size: ${SIZES.md}px;
`

export const SmallText = styled.Text`
  color: ${({theme}) => theme.SECONDARY_TEXT_COLOR};
  font-size: ${SIZES.sm}px;
`

export const LinkText = styled.Text`
  color: ${({theme}) => theme.darkGold};
  font-weight: bold;
`

export const ErrorText = styled.Text`
  color: ${({theme}) => theme.red};
`