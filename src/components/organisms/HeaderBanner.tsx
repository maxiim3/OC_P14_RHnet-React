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
import {ODescription, OIcon, OLabel, OPath} from "../../misc/types"

//region atoms
export const Button = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
	border: none;
	background-color: ${({theme}) => theme.txt.rgb};
	color: ${({theme}) => theme.bg.rgb};
	cursor: pointer;
	transition: all 0.3s ease-in-out;

	&:hover {
		background-color: ${({theme}) => theme.txt.rgba(0.8)};
	}
`
export const Header = styled.header`
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
export const LogoAndTitle = styled.div`
	width: 36px;
	height: 36px;

	#logo {
		// Logo top left of nav bar
		width: 100%;
		height: 100%;
	}

	@media (min-width: ${screens.screen400}) {
		display: flex;
		align-items: center;
		flex-flow: nowrap;
		flex-direction: column;
		justify-content: center;
		width: fit-content;
		height: 96px;
	}
`
export const Title = styled.p`
	// Health Wealth
	// not visible on mobile
	display: none;
	user-select: none;
	pointer-events: none;
	@media (min-width: ${screens.screen400}) {
		font-size: 8px;
		display: block;
		color: ${({theme}: OThemeProps) => theme.txt.rgb};
	}
`
export const Nav = styled.nav``

export const UnorderedList = styled.ul`
	// Wraps the links for navigation
	display: flex;
	flex-flow: row wrap;
	gap: clamp(4px, 2vw, 12px);
`

export const ListItem = styled.li`
	// Navigation link individual item [PageLink Component]

	display: flex;
	align-items: center;
	flex-direction: row;
	justify-content: center;
	max-width: 240px;
	padding: 4px 8px;
	gap: 4px;
`
export const Icon = styled.span`
	font-size: 16px;
	display: none; // not visible on mobile

	@media (min-width: ${screens.screen400}) {
		font-size: 24px;
		display: block; // not visible on mobile
		color: ${({theme}: OThemeProps) => theme.txt.rgb};
	}
`
export const Link = styled(NavLink)`
	&.active {
		color: ${({theme}: OThemeProps) => theme.txt.rgb};
	}

	&:visited {
		color: ${({theme}: OThemeProps) => theme.txt.rgb};
	}
`
//endregion
//region molecules
export const ToggleThemeButton = () => {
	const {theme, toggleTheme} = useThemeProvider()
	return (
		/*@ts-ignore*/
		<Button onClick={toggleTheme}>
			{/*@ts-ignore*/}
			{theme.slug === "light" ? <FiSun /> : <BsFillMoonStarsFill />}
		</Button>
	)
}

export function LogoBlock() {
	return (
		<LogoAndTitle>
			<Logo />
			<Title>Health Wealth</Title>
		</LogoAndTitle>
	)
}

export const NavLinkItem = ({
	label,
	icon,
	description,
	path,
}: OLabel & OIcon & ODescription & OPath) => {
	return (
		<ListItem tabIndex={-1}>
			<Icon tabIndex={-1}>{icon}</Icon>
			<Link
				tabIndex={0}
				aria-label={label}
				aria-description={description}
				to={path}>
				{label}
			</Link>
		</ListItem>
	)
}

export function Navigation() {
	return (
		<Nav>
			<UnorderedList>
				<NavLinkItem
					path={Path.root}
					icon={<AiFillHome />}
					label={"Home"}
					description={"Navigate to home page"}
				/>
				<NavLinkItem
					path={Path.newEmployee}
					icon={<MdOutlineAddCircle />}
					label={"New Member"}
					description={"Navigate to new member page"}
				/>
				<NavLinkItem
					path={Path.employeeList}
					icon={<RiTeamFill />}
					label={"Team Members"}
					description={"Navigate to the page of all team members"}
				/>
			</UnorderedList>
		</Nav>
	)
}

//endregion

//region organisms
export const HeaderBanner = () => {
	return (
		<Header>
			<LogoBlock />
			<Navigation />
			<ToggleThemeButton />
		</Header>
	)
}
//endregion
