"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";

import "./Input-otp.css";

export function InputOTP({
  className = "",
  containerClassName = "",
  ...props
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={`input-otp-container ${containerClassName}`}
      className={`input-otp ${className}`}
      {...props}
    />
  );
}

export function InputOTPGroup({ className = "", ...props }) {
  return (
    <div
      data-slot="input-otp-group"
      className={`input-otp-group ${className}`}
      {...props}
    />
  );
}

export function InputOTPSlot({
  index,
  className = "",
  ...props
}) {
  const context = React.useContext(OTPInputContext);
  const slot = context?.slots[index] || {};

  const { char, hasFakeCaret, isActive } = slot;

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={`input-otp-slot ${className}`}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="otp-caret-wrapper">
          <div className="otp-caret" />
        </div>
      )}
    </div>
  );
}

export function InputOTPSeparator(props) {
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      className="input-otp-separator"
      {...props}
    >
      <MinusIcon />
    </div>
  );
}
