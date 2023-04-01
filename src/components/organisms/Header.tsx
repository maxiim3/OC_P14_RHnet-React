import React from "react"
import styled from "styled-components"
import {OThemeProps, useThemeProvider} from "../../layouts/WrapperProvider"
import {
	AiFillHome,
	BsFillMoonStarsFill,
	FiSun,
	MdOutlineAddCircle,
	RiTeamFill,
} from "react-icons/all"
import {screens} from "../../styles/constants.styled"
import {Logo} from "../atoms/Logo"
import {NavLink} from "react-router-dom"
import Path from "../../misc/config.path"
import {OClassName, ODescription, OIcon, OLabel, OPath} from "../../misc/types"
import {clampFluidSize} from "../../misc/clampFluidSize"

//region atoms

//endregion
//region molecules
export const ToggleThemeButton = styled(({className}: OClassName) => {
	const {theme, toggleTheme} = useThemeProvider()
	return (
		/*@ts-ignore*/
		<button
			className={className}
			onClick={toggleTheme}>
			{/*@ts-ignore*/}
			{theme.slug === "light" ? <FiSun /> : <BsFillMoonStarsFill />}
		</button>
	)
})`
	display: grid;
	padding: ${clampFluidSize(8, 16)}; // fluid padding
	border: none;
	place-content: center;
	border-radius: 50%;
	background-color: ${({theme}) => theme.txt.rgb};
	color: ${({theme}) => theme.bg.rgb};
	cursor: pointer;
	transition: all 0.3s ease-in-out;

	&:hover {
		background-color: ${({theme}) => theme.txt.rgba(0.8)};
	}

	> svg {
		font-size: ${clampFluidSize(14, 24)}; // fluid font size
	}
`

export const LogoBlock = styled(({className}: OClassName) => {
	return (
		<div className={className}>
			<Logo />
			<p className="title">Health Wealth</p>
		</div>
	)
})`
	width: 36px;
	height: 36px;

	#logo {
		// Logo top left of nav bar
		width: 100%;
		height: 100%;
	}

	p {
		// Health Wealth Title - not visible on mobile
		display: none;
		user-select: none;
		pointer-events: none;
		font-size: ${clampFluidSize(8, 14)}; // fluid font size
	}

	@media (min-width: ${screens.screen400}) {
		display: flex;
		align-items: center;
		flex-flow: nowrap;
		flex-direction: column;
		justify-content: center;
		width: fit-content;
		height: 96px;
		p {
			display: block;
			color: ${({theme}: OThemeProps) => theme.txt.rgb};
		}
	}
`

type NavLinkItemProps = OLabel & OIcon & ODescription & OPath & OClassName
export const NavLinkItem = styled(
	({label, icon, description, path, className}: NavLinkItemProps) => {
		return (
			<li
				className={className}
				tabIndex={-1}>
				<span
					className={"icon"}
					tabIndex={-1}>
					{icon}
				</span>
				<NavLink
					className={"link"}
					tabIndex={0}
					aria-label={label}
					aria-description={description}
					to={path}>
					{label}
				</NavLink>
			</li>
		)
	}
)`
	display: flex;
	align-items: center;
	flex-direction: row;
	justify-content: center;
	//max-width: 240px;
	padding-block: 8px;
	padding-inline: ${clampFluidSize(0, 16)}; // fluid padding
	gap: ${clampFluidSize(2, 16)}; // fluid gap

	.icon {
		display: none; // not visible on mobile
	}

	.link {
		font-size: ${clampFluidSize(12, 20)}; // fluid font size
		&.active {
			color: ${({theme}: OThemeProps) => theme.txt.rgb};
		}

		&:visited {
			color: ${({theme}: OThemeProps) => theme.txt.rgb};
		}
	}

	@media (min-width: ${screens.screen400}) {
		.icon {
			font-size: ${clampFluidSize(16, 24)}; // fluid font size
			display: block; // not visible on mobile
			color: ${({theme}: OThemeProps) => theme.txt.rgb};
		}
	}
`

export const Navigation = styled(({className}: OClassName) => (
	<nav className={className}>
		<ul>
			<NavLinkItem
				path={Path.root}
				icon={<AiFillHome />}
				label={"Home"}
				description={"Go to home page"}
			/>
			<NavLinkItem
				path={Path.newEmployee}
				icon={<MdOutlineAddCircle />}
				label={"Create Employee"}
				description={"Go to create employee page"}
			/>
			<NavLinkItem
				path={Path.employeeList}
				icon={<RiTeamFill />}
				label={"List of Employees"}
				description={"Go to list of employees page"}
			/>
		</ul>
	</nav>
))`
	ul {
		// Wraps the links for navigation
		display: flex;
		flex-flow: row wrap;
		gap: 0; // no gap on mobile
	}

	@media (min-width: ${screens.screen100}) {
		ul {
			gap: ${clampFluidSize(0, 16)}; // fluid gap
		}
	}
`

//endregion

//region organisms
export const Header = styled(({className}: OClassName) => {
	return (
		<header className={className}>
			<LogoBlock />
			<Navigation />
			<ToggleThemeButton />
		</header>
	)
})`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 6px 4px 10px;

	border-bottom: 1px solid ${({theme}: OThemeProps) => theme.txt.rgb};
	background: ${({theme}: OThemeProps) => theme.bg.rgb};

	@media (min-width: ${screens.screen100}) {
		padding: 8px clamp(12px, 3vw, 48px) 12px;
		gap: 48px;
	}
	@media (min-width: ${screens.screen400}) {
		padding: 8px clamp(54px, 8vw, 120px) 12px;
	}
`
//endregion
