import { LucideProps } from "lucide-react";
import {
  PersonIcon,
  EyeOpenIcon,
  EyeClosedIcon,
  MixIcon,
  MixerVerticalIcon,
  ExitIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
  ChevronLeftIcon,
  HamburgerMenuIcon,
  HomeIcon,
  BackpackIcon,
  ExternalLinkIcon,
  GearIcon,
  FileIcon,
  FileTextIcon,
  ChevronRightIcon,
  PlusCircledIcon,
  LightningBoltIcon,
  CaretSortIcon,
  DoubleArrowLeftIcon,
  MinusCircledIcon,
  BellIcon,
  CheckCircledIcon,
  CheckIcon,
  RocketIcon,
  DotsHorizontalIcon,
  Cross2Icon,
  ArrowRightIcon,
  TrashIcon,
  DashboardIcon,
  UpdateIcon,
  ExclamationTriangleIcon,
  PauseIcon,
  TimerIcon,
  CrossCircledIcon,
  SewingPinIcon,
  MagicWandIcon,
} from "@radix-ui/react-icons";
import { Loader2, Banknote, Route, Building } from "lucide-react";

// Default values shown

type logoProps = {
  // color: "light" | "dark";
  size?: "s" | "m" | "l" | "xl";
};

//create a map of sizes
const sizes = {
  s: {
    width: "15",
    height: "21.5",
  },
  m: {
    width: "30",
    height: "43",
  },
  l: {
    width: "90",
    height: "129",
  },
  xl: {
    width: "180",
    height: "258",
  },
};

export const Icons = {
  user: PersonIcon,
  spinner: UpdateIcon,
  view: EyeOpenIcon,
  hide: EyeClosedIcon,
  mix: MixIcon,
  mixerVertical: MixerVerticalIcon,
  logout: ExitIcon,
  search: MagnifyingGlassIcon,
  moon: MoonIcon,
  menu: HamburgerMenuIcon,
  sun: SunIcon,
  home: HomeIcon,
  chevronLeft: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
  backpack: BackpackIcon,
  banknote: Banknote,
  externalLink: ExternalLinkIcon,
  gear: GearIcon,
  file: FileIcon,
  fileText: FileTextIcon,
  plusCircled: PlusCircledIcon,
  lightning: LightningBoltIcon,
  caretSort: CaretSortIcon,
  doubleArrowLeft: DoubleArrowLeftIcon,
  plus: PlusCircledIcon,
  minus: MinusCircledIcon,
  bell: BellIcon,
  checkCircled: CheckCircledIcon,
  check: CheckIcon,
  rocket: RocketIcon,
  dotsHorizontal: DotsHorizontalIcon,
  route: Route,
  cross: Cross2Icon,
  arrowRight: ArrowRightIcon,
  trash: TrashIcon,
  dashboard: DashboardIcon,
  exlamationTriangle: ExclamationTriangleIcon,
  pause: PauseIcon,
  timer: TimerIcon,
  CrossCircled: CrossCircledIcon,
  SewingPin: SewingPinIcon,
  MagicWand: MagicWandIcon,
  building: Building,

  logo: (props: LucideProps & logoProps) => {
    const { size, className } = props;

    const { width, height } = sizes[size ? size : "s"];

    return (
      <svg
        className={className}
        width={width}
        height={height}
        viewBox="0 0 90 129"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_501_2)">
          <path
            d="M87.8 25.44C87.1052 24.742 86.2793 24.1883 85.3697 23.8108C84.4601 23.4332 83.4848 23.2392 82.5 23.24H52.5C50.5117 23.2426 48.6056 24.0337 47.1996 25.4396C45.7937 26.8456 45.0026 28.7517 45 30.74V53.24H37.5C32.5751 53.2387 27.6981 54.2077 23.1478 56.0918C18.5975 57.9759 14.463 60.7381 10.9806 64.2206C7.49811 67.703 4.73593 71.8375 2.85184 76.3878C0.967757 80.9381 -0.00131251 85.8151 1.33417e-06 90.74V113.24C7.98387e-05 114.354 0.124178 115.464 0.370001 116.55C0.410001 116.75 0.460001 116.95 0.520001 117.15C0.591482 117.441 0.67827 117.728 0.780001 118.01C0.860001 118.24 0.940001 118.46 1.03 118.69C1.12 118.92 1.22 119.16 1.33 119.4C1.44 119.64 1.63 120.04 1.8 120.4C1.97 120.7 2.15 121 2.33 121.28C2.51 121.56 2.72 121.88 2.93 122.16V122.22C3.12 122.47 3.31 122.71 3.51 122.94C3.6727 123.143 3.84629 123.336 4.03 123.52L4.35 123.85C4.52 124.03 4.7 124.2 4.89 124.37L5.23 124.66L5.75 125.09L5.98 125.27L6.7 125.78L7.16 126.06C7.30753 126.16 7.46117 126.25 7.62 126.33L8.03 126.56L8.19 126.64L8.57 126.82C8.87 126.97 9.18 127.1 9.5 127.23H9.6L10.02 127.39C10.5471 127.575 11.0847 127.728 11.63 127.85L12.17 127.96C12.3482 128 12.5285 128.03 12.71 128.05H12.9L13.55 128.12L14.25 128.17H14.95H45V120.67C45 118.681 44.2098 116.773 42.8033 115.367C41.3968 113.96 39.4891 113.17 37.5 113.17H30C30.0026 111.2 29.6152 109.249 28.86 107.43C28.1048 105.611 26.9968 103.959 25.6 102.57L25.17 102.17L24.37 101.47C24.07 101.23 23.75 100.98 23.37 100.75L22.37 100.14L21.77 99.82C21.55 99.7 21.33 99.6 21.1 99.5C25.0237 98.2948 29.153 97.9076 33.2323 98.3624C37.3117 98.8172 41.2543 100.104 44.8162 102.144C48.3782 104.184 51.4837 106.933 53.9406 110.221C56.3975 113.509 58.1535 117.266 59.1 121.26C63.9989 117.816 67.9998 113.247 70.7666 107.936C73.5333 102.625 74.9851 96.7282 75 90.74V53.24C78.9782 53.24 82.7936 51.6596 85.6066 48.8466C88.4197 46.0336 90 42.2182 90 38.24V30.74C90.0008 29.7552 89.8068 28.7799 89.4292 27.8703C89.0517 26.9607 88.498 26.1348 87.8 25.44ZM67.4 34.24C67.4348 34.7731 67.3555 35.3074 67.1676 35.8075C66.9796 36.3075 66.6873 36.7618 66.31 37.14C65.7782 37.6638 65.1053 38.0213 64.3736 38.1687C63.6419 38.3161 62.8831 38.247 62.19 37.97C61.4601 37.676 60.8448 37.154 60.4357 36.4819C60.0267 35.8097 59.8458 35.0233 59.92 34.24H67.4Z"
            fill="currentColor"
          />
          <path
            d="M67.63 8.23999H67.37C63.2997 8.23999 60 11.5397 60 15.61V15.87C60 19.9403 63.2997 23.24 67.37 23.24H67.63C71.7003 23.24 75 19.9403 75 15.87V15.61C75 11.5397 71.7003 8.23999 67.63 8.23999Z"
            fill="#FB8500"
          />
          <path
            d="M77.15 8.3H67C66.9997 7.17578 67.5113 6.09616 68.4254 5.29242C69.3394 4.48868 70.5831 4.02475 71.89 4.00002C73.2419 3.99649 74.5432 4.44156 75.523 5.24255C76.5029 6.04355 77.0856 7.13872 77.15 8.3Z"
            fill="#17AA2B"
          />
          <path
            d="M74.1896 2.13263L66.9996 8.29146C66.1223 7.46275 65.6505 6.37556 65.6822 5.2558C65.7138 4.13603 66.2465 3.0698 67.1696 2.27866C68.0916 1.48072 69.337 1.01995 70.6454 0.992733C71.9538 0.965516 73.2238 1.37397 74.1896 2.13263Z"
            fill="#1AD33C"
          />
        </g>
        <defs>
          <clipPath id="clip0_501_2">
            <rect width="90" height="128.24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  },

  gitHub: (props: LucideProps) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      ></path>
    </svg>
  ),
  nextjs: (props: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"
      />
    </svg>
  ),
  facebook: ({ ...props }: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" {...props}>
      <path
        fill="currentColor"
        d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
      />
    </svg>
  ),
  discord: ({ ...props }: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" {...props}>
      <path
        fill="currentColor"
        d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"
      />
    </svg>
  ),
  google: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="discord"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 488 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
      ></path>
    </svg>
  ),
  orange: ({ ...props }: LucideProps) => (
    <svg
      width={32}
      height={32}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M45.1067 12.8257C46.2105 13.3241 47.2326 14.0004 48.1238 14.8392C49.873 16.4855 50.9996 18.6493 51.3118 20.9888C51.5189 22.541 50.7031 23.7597 49.5821 24.3756C49.0631 24.6607 48.4786 24.8166 47.9 24.8166H45.3358C46.2866 25.709 47.1464 26.6971 47.9 27.7656C48.0032 27.9119 48.1044 28.0598 48.2036 28.2091C50.2233 31.2495 51.4 34.8983 51.4 38.8219V39.4112C51.4 50.0183 42.8006 58.6166 32.1947 58.6166H31.6053C20.9994 58.6166 12.4 50.0183 12.4 39.4112V38.8219C12.4 30.9385 17.1502 24.1646 23.944 21.2057C24.6536 20.8967 25.3854 20.6293 26.1364 20.4065C26.4811 20.3043 26.8298 20.2115 27.1822 20.1285C26.9338 19.5728 26.7332 18.9945 26.5828 18.4002C26.5683 18.343 26.5543 18.2856 26.5407 18.2282C26.4329 17.7709 26.3553 17.3075 26.3075 16.8409C26.2118 15.9057 26.2364 14.9577 26.3798 14.0211C26.5946 12.6172 27.0728 11.2612 27.7849 10.0278C28.497 8.79441 29.4323 7.70226 30.5406 6.81425C31.6491 5.92613 32.9131 5.25649 34.2645 4.85011C35.6164 4.44361 37.0303 4.30837 38.4254 4.46104C39.3768 4.56516 40.3048 4.80166 41.1842 5.16406C42.7579 5.81264 43.3861 7.31084 43.23 8.6876C43.1761 9.16387 43.0283 9.62561 42.7933 10.0326L41.7195 11.8924C42.8953 12.0279 44.0392 12.3437 45.1067 12.8257ZM46.4907 9.72005C47.9355 10.3704 49.2784 11.2568 50.4541 12.3634C52.7564 14.5303 54.2634 17.4032 54.6819 20.5391C55.0858 23.566 53.5948 25.8806 51.5534 27.1436C53.6141 30.5519 54.8 34.5484 54.8 38.8219V39.4112C54.8 51.8961 44.6783 62.0166 32.1947 62.0166H31.6053C19.1217 62.0166 9 51.8961 9 39.4112V38.8219C9 29.3776 14.792 21.2862 23.017 17.9053C22.7929 16.4471 22.796 14.963 23.0189 13.5067C23.2982 11.6816 23.9189 9.92393 24.8405 8.32781C25.762 6.7317 26.9738 5.31533 28.4147 4.16085C29.8559 3.00614 31.5077 2.1287 33.2855 1.59412C35.0642 1.05927 36.9366 0.87781 38.7952 1.08122C40.0628 1.21994 41.3026 1.53544 42.4797 2.02055C45.9756 3.46132 47.0731 6.872 46.4907 9.72005Z"
        fill="black"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M41.1842 5.16406C40.3048 4.80166 39.3768 4.56516 38.4254 4.46104C37.0303 4.30837 35.6164 4.44361 34.2645 4.85011C32.9131 5.25649 31.6491 5.92613 30.5406 6.81425C29.4323 7.70226 28.497 8.79441 27.7849 10.0278C27.0728 11.2612 26.5946 12.6172 26.3798 14.0211C26.1649 15.4251 26.2169 16.8546 26.5407 18.2282C26.6951 18.883 26.9099 19.5193 27.1822 20.1285C18.7081 22.1261 12.4 29.7374 12.4 38.8219V39.4112C12.4 50.0183 20.9994 58.6166 31.6053 58.6166H32.1947C42.8006 58.6166 51.4 50.0183 51.4 39.4112V38.8219C51.4 33.2987 49.0683 28.3202 45.3358 24.8166H47.9C49.7286 24.8166 51.6148 23.2596 51.3118 20.9888C50.9996 18.6493 49.873 16.4855 48.1238 14.8392C46.3707 13.1892 44.1112 12.1681 41.7195 11.8924L42.7933 10.0326C43.7075 8.44908 43.3023 6.03701 41.1842 5.16406ZM37.0621 14.9592L38.8132 11.9264L40.6282 8.78261C40.9043 8.30432 40.7422 7.68589 40.2316 7.47545C39.5712 7.20329 38.8724 7.02488 38.1534 6.94619C37.0992 6.83083 36.0224 6.93209 34.9844 7.24421C33.9464 7.55633 32.9676 8.07319 32.1038 8.76527C31.24 9.45736 30.5081 10.3111 29.95 11.2778C29.3919 12.2445 29.0184 13.3052 28.851 14.3993C28.6835 15.4934 28.7253 16.5996 28.974 17.6545C29.1427 18.3701 29.4043 19.0527 29.7509 19.6847L29.757 19.6958L29.7615 19.704C29.9231 19.9968 30.103 20.2787 30.3004 20.5479C30.728 21.1313 31.232 21.6473 31.7979 22.0831C31.8131 22.0949 31.8287 22.106 31.8444 22.1166H31.6053C30.9084 22.1166 30.2215 22.1593 29.547 22.2421C29.2169 22.2827 28.8897 22.3329 28.5657 22.3925C20.7914 23.8218 14.9 30.6339 14.9 38.8219V39.4112C14.9 48.6375 22.38 56.1166 31.6053 56.1166H32.1947C41.42 56.1166 48.9 48.6375 48.9 39.4112V38.8219C48.9 32.9564 45.8768 27.797 41.3039 24.8166L45.3358 24.8166C44.3266 23.8693 43.215 23.0298 42.0194 22.3166H47.9C48.4523 22.3166 48.9068 21.8669 48.8338 21.3195C48.5997 19.5654 47.7527 17.9231 46.4104 16.6597C44.8163 15.1594 42.6543 14.3166 40.4 14.3166C40.3732 14.3166 40.3465 14.3167 40.3197 14.3169C39.1891 14.327 38.0832 14.5489 37.0621 14.9592Z"
        fill="#EF5F00"
      />
      <path
        d="M45.3358 24.8166C44.3266 23.8693 43.215 23.0298 42.0194 22.3166H35.7011L35.6143 22.4669C37.6756 22.8958 39.5976 23.7045 41.3039 24.8166L45.3358 24.8166Z"
        fill="#EF5F00"
      />
      <path
        d="M46.9 20.3166C47.4523 20.3166 47.9068 19.8669 47.8338 19.3195C47.5997 17.5654 46.7527 15.9231 45.4104 14.6597C43.8163 13.1594 41.6543 12.3166 39.4 12.3166C37.1457 12.3166 34.9837 13.1594 33.3896 14.6597C32.0473 15.9231 31.2003 17.5654 30.9662 19.3195C30.8932 19.8669 31.3477 20.3166 31.9 20.3166H46.9Z"
        fill="#218358"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M47.1238 12.8392C48.873 14.4855 49.9996 16.6493 50.3118 18.9888C50.6148 21.2596 48.7286 22.8166 46.9 22.8166H31.9C30.0714 22.8166 28.1852 21.2596 28.4882 18.9888C28.8004 16.6493 29.927 14.4855 31.6762 12.8392C33.7491 10.8883 36.5299 9.81658 39.4 9.81658C42.2701 9.81658 45.0509 10.8883 47.1238 12.8392ZM47.8338 19.3195C47.9068 19.8669 47.4523 20.3166 46.9 20.3166H31.9C31.3477 20.3166 30.8932 19.8669 30.9662 19.3195C31.2003 17.5654 32.0473 15.9231 33.3896 14.6597C34.9837 13.1594 37.1457 12.3166 39.4 12.3166C41.6543 12.3166 43.8163 13.1594 45.4104 14.6597C46.7527 15.9231 47.5997 17.5654 47.8338 19.3195Z"
        fill="#FEFCFB"
      />
      <path
        d="M39.6282 6.78261C39.9043 6.30432 39.7422 5.68589 39.2316 5.47545C38.5712 5.20329 37.8724 5.02488 37.1534 4.94619C36.0992 4.83083 35.0224 4.93209 33.9844 5.24421C32.9464 5.55633 31.9676 6.07319 31.1038 6.76527C30.24 7.45736 29.5081 8.31112 28.95 9.2778C28.3919 10.2445 28.0184 11.3052 27.851 12.3993C27.6835 13.4934 27.7253 14.5996 27.974 15.6545C28.2227 16.7095 28.6734 17.6927 29.3004 18.5479C29.728 19.1313 30.232 19.6473 30.7979 20.0831C31.2354 20.4201 31.8521 20.2513 32.1282 19.773L39.6282 6.78261Z"
        fill="#30A46C"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M37.4254 2.46103C38.3768 2.56515 39.3048 2.80165 40.1842 3.16405C42.3023 4.03701 42.7075 6.44908 41.7933 8.03261L34.2933 21.023C33.379 22.6065 31.0875 23.4617 29.2724 22.0638C28.5189 21.4834 27.8501 20.798 27.2842 20.0261C26.4545 18.8943 25.8646 17.6022 25.5407 16.2282C25.2169 14.8546 25.1649 13.4251 25.3798 12.0211C25.5946 10.6172 26.0728 9.2612 26.7849 8.0278C27.497 6.7944 28.4323 5.70225 29.5406 4.81424C30.6491 3.92612 31.9131 3.25648 33.2645 2.8501C34.6164 2.4436 36.0303 2.30836 37.4254 2.46103ZM39.2316 5.47545C39.7422 5.68589 39.9043 6.30432 39.6282 6.78261L32.1282 19.773C31.8521 20.2513 31.2354 20.4201 30.7979 20.0831C30.232 19.6473 29.728 19.1313 29.3004 18.5479C28.6734 17.6927 28.2227 16.7095 27.974 15.6545C27.7253 14.5996 27.6835 13.4934 27.851 12.3993C28.0184 11.3052 28.3919 10.2445 28.95 9.2778C29.5081 8.31112 30.24 7.45736 31.1038 6.76527C31.9676 6.07319 32.9464 5.55633 33.9844 5.24421C35.0224 4.93209 36.0992 4.83083 37.1534 4.94619C37.8724 5.02488 38.5712 5.20329 39.2316 5.47545Z"
        fill="#FEFCFB"
      />
      <path
        d="M31.1947 20.1166H30.6053C21.38 20.1166 13.9 27.5958 13.9 36.8219V37.4112C13.9 46.6375 21.38 54.1166 30.6053 54.1166H31.1947C40.42 54.1166 47.9 46.6375 47.9 37.4112V36.8219C47.9 27.5958 40.42 20.1166 31.1947 20.1166Z"
        fill="#F76B15"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.6053 17.6166H31.1947C41.8006 17.6166 50.4 26.215 50.4 36.8219V37.4112C50.4 48.0183 41.8006 56.6166 31.1947 56.6166H30.6053C19.9994 56.6166 11.4 48.0183 11.4 37.4112V36.8219C11.4 26.215 19.9994 17.6166 30.6053 17.6166ZM30.6053 20.1166H31.1947C40.42 20.1166 47.9 27.5958 47.9 36.8219V37.4112C47.9 46.6375 40.42 54.1166 31.1947 54.1166H30.6053C21.38 54.1166 13.9 46.6375 13.9 37.4112V36.8219C13.9 27.5958 21.38 20.1166 30.6053 20.1166Z"
        fill="#FEFCFB"
      />
    </svg>
  ),
};
{
  /* <svg
  width="16"
  height="32"
  viewBox="0 0 16 32"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  {...props}
>
  <mask id="path-1-inside-1_324_14" fill="white">
    <path d="M15.632 8.45966C15.632 7.48415 15.2203 6.54859 14.4874 5.8588C13.7545 5.16901 12.7604 4.78149 11.724 4.78149C10.6875 4.78149 9.69346 5.16901 8.96056 5.8588C8.22766 6.54859 7.81592 7.48415 7.81592 8.45965L11.724 8.45966H15.632Z" />
  </mask>
  <path
    d="M15.632 8.45966C15.632 7.48415 15.2203 6.54859 14.4874 5.8588C13.7545 5.16901 12.7604 4.78149 11.724 4.78149C10.6875 4.78149 9.69346 5.16901 8.96056 5.8588C8.22766 6.54859 7.81592 7.48415 7.81592 8.45965L11.724 8.45966H15.632Z"
    fill="#2F7C57"
    stroke="white"
    stroke-width="1.6"
    mask="url(#path-1-inside-1_324_14)"
  />
  <mask id="path-2-inside-2_324_14" fill="white">
    <path d="M12.0588 1.83919C11.6404 1.59768 11.1757 1.44607 10.691 1.39303C10.2064 1.33999 9.71127 1.38655 9.23403 1.53005C8.7568 1.67355 8.30675 1.91119 7.9096 2.22939C7.51245 2.54759 7.17596 2.94012 6.91936 3.38458C6.66275 3.82903 6.49105 4.3167 6.41406 4.81975C6.33706 5.32279 6.35629 5.83136 6.47063 6.31641C6.58497 6.80146 6.79219 7.2535 7.08046 7.64671C7.36873 8.03992 7.7324 8.36661 8.15071 8.60812L10.1047 5.22366L12.0588 1.83919Z" />
  </mask>
  <path
    d="M12.0588 1.83919C11.6404 1.59768 11.1757 1.44607 10.691 1.39303C10.2064 1.33999 9.71127 1.38655 9.23403 1.53005C8.7568 1.67355 8.30675 1.91119 7.9096 2.22939C7.51245 2.54759 7.17596 2.94012 6.91936 3.38458C6.66275 3.82903 6.49105 4.3167 6.41406 4.81975C6.33706 5.32279 6.35629 5.83136 6.47063 6.31641C6.58497 6.80146 6.79219 7.2535 7.08046 7.64671C7.36873 8.03992 7.7324 8.36661 8.15071 8.60812L10.1047 5.22366L12.0588 1.83919Z"
    fill="#30A46C"
    stroke="white"
    stroke-width="1.6"
    mask="url(#path-2-inside-2_324_14)"
  />
  <path
    d="M7.68061 8.86792H7.95158C11.917 8.86792 15.1322 12.0828 15.1322 16.0485V16.3195C15.1322 20.2853 11.917 23.5001 7.95158 23.5001H7.68061C3.7152 23.5001 0.5 20.2853 0.5 16.3195V16.0485C0.5 12.0828 3.7152 8.86792 7.68061 8.86792Z"
    fill="#FF801F"
    stroke="white"
  />
</svg>; */
}
