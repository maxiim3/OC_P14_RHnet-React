import {screens} from "../styles/constants.styled"
import {css} from "styled-components"

/**
 * # clampFluidSize
 * Generates a responsive CSS clamp rule for an element's size based on provided minimum and maximum size values and an optional viewport size.
 *
 * @param {number} min - The minimum size of the element (in pixels).
 * @param {number} max - The maximum size of the element (in pixels).
 * @param {string} [viewPort] - An optional viewport size string (e.g., "700px"). If not provided, the default is screens.screen700.
 * @returns {string} A CSS rule using the clamp() function with a calculated fluid size based on the provided values.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/clamp
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/calc
 * @link screens
 * @requires screens
 * @requires styled-components/css
 * @utility
 * @function
 * @example
 * // Generate a responsive font-size CSS rule with a minimum of 16px, a maximum of 32px, and a default viewport width of 700px.
 * const fontSizeStyle = clampFluidSize(16, 32);
 * // Result: "clamp(16px, calc(32 / 700 * 100vw), 32px)"
 */
export function clampFluidSize(min: number, max: number, viewPort?: string) {
	let vp = Number((viewPort || screens.screen700).replace("px", ""))
	return css`clamp(${min}px, calc(${max} / ${vp} * 100vw), ${max}px)`
}