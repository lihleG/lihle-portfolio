"use client";

import { Component, type ReactNode } from "react";

interface Props {
  fallback: ReactNode;
  children: ReactNode;
}

interface State {
  failed: boolean;
}

/** Catches runtime 3D errors (context loss, shader failures) so the page never breaks. */
export class SceneBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[HeroScene] falling back to static visual:", error);
    }
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
