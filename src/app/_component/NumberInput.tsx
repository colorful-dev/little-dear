import {
  Grid,
  type GridItemProps,
  GridItem as GridItemRaw,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { withDefaultProps } from "../_util";

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

function GridItem({
  children,
  autoH,
  ...props
}: GridItemProps & { autoH?: boolean }) {
  return (
    <GridItemRaw
      {...props}
      w="100%"
      h={autoH ? "auto" : 20}
      className="s-fcc active:text-gray-500"
    >
      {children}
    </GridItemRaw>
  );
}

export interface NumberInputProps {
  /**
   * @default 'transparent'
   */
  background?: string;
  /**
   * @default ''
   */
  confirmButtonClass?: string;
}

export const NumberInput = withDefaultProps(
  (props: NumberInputProps) => {
    const { background, confirmButtonClass } = props;
    const [number, setNumber] = useState(0);

    return (
      <div className="flex">
        <Grid
          templateColumns="repeat(3, 1fr)"
          className="flex-[3]"
          background={background}
        >
          {/* 1 ~ 9 */}
          {range(1, 9).map((n) => (
            <GridItem key={n}>{n}</GridItem>
          ))}
          {/* - 0 . */}
          <GridItem>-</GridItem>
          <GridItem>0</GridItem>
          <GridItem>.</GridItem>
        </Grid>
        <Grid templateRows="1fr 1fr 2fr" className="flex-[1]">
          {/* operations */}
          <GridItem>R</GridItem>
          <GridItem>+</GridItem>
          <GridItem autoH className={confirmButtonClass}>
            完成
          </GridItem>
        </Grid>
      </div>
    );
  },
  {
    background: "transparent",
  },
);
