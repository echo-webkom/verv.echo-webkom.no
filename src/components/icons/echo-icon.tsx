import { SVGProps } from "react";

export type EchoIconProps = SVGProps<SVGSVGElement>;

export const EchoIcon = ({ ...props }: EchoIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="288"
      height="229"
      viewBox="0 0 288 229"
      fill="currentColor"
      {...props}
    >
      <path d="M0 0H58V29H29L0 0Z" />
      <path d="M145 87H88V58H116L145 87Z" />
      <path d="M29 29H87L116 58H58L29 29Z" />
      <path d="M58.0001 0L87 29H58.0001V0Z" />
      <path d="M58 58L88 87V58H58Z" />
      <path d="M135 117H175L155 137L135 117Z" />
      <path d="M88 87H145L175 117L118 117L88 87Z" />
      <path d="M135 117L155 137L134 158L93 117H135Z" />
      <path d="M93 117L134 158H52L93 117Z" />
      <path d="M93 117L134 158H52L93 117Z" />
      <path d="M93 199L134 158H52L93 199Z" />
      <path d="M93 199L134 158H52L93 199Z" />
      <path d="M52 158L11 199H93L52 158Z" />
      <path d="M52 158L11 199H93L52 158Z" />
      <path d="M288 229L229 170H288V229Z" />
      <path d="M200 141L259 200H200V141Z" />
    </svg>
  );
};
