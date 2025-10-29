import svgPaths from "./svg-il1r19guj0";
import imgRocketMonoE0Dedcb10BPng from "figma:asset/9cef46bd713e70c2b130d32f10e2dc0e01cbffbd.png";
import imgProfessionalWomanWithShoulderLengthBrownHairInWhiteBlouse from "figma:asset/95d7a9441ece29d0959b696f896ad7aa18c44dda.png";
import imgAsianManWithShortBlackHairWearingNavyBlueShirt from "figma:asset/8f8739691b761475875d05de592ee9166a999b67.png";
import imgHispanicWomanWithLongDarkHairInProfessionalAttire from "figma:asset/4afc0e5a544bfde91b9b95c54aae40d325105d17.png";

function ItemButton() {
  return (
    <div className="box-border content-stretch flex flex-col items-center justify-center mr-[-0.01px] relative shrink-0" data-name="Item → Button">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-gray-500 text-nowrap">
        <p className="leading-[normal] whitespace-pre">Dashboard</p>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="SVG">
          <path d={svgPaths.p29776500} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Margin() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-800 text-nowrap">
        <p className="leading-[normal] whitespace-pre">AI Task Assignment</p>
      </div>
    </div>
  );
}

function Item() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Item">
      <Svg />
      <Margin />
    </div>
  );
}

function ItemMargin() {
  return (
    <div className="box-border content-stretch flex flex-col items-start mr-[-0.01px] pl-[8px] pr-0 py-0 relative shrink-0" data-name="Item:margin">
      <Item />
    </div>
  );
}

function OrderedList() {
  return (
    <div className="box-border content-stretch flex items-center pl-0 pr-[0.01px] py-0 relative shrink-0" data-name="Ordered List">
      <ItemButton />
      <ItemMargin />
    </div>
  );
}

function NavBreadcrumb() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Nav - Breadcrumb">
      <OrderedList />
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d="M12 8V4H8" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p22a3b200} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M2 14H4" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M20 14H22" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M15 13V15" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M9 13V15" id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#e4007f] box-border content-stretch flex items-center justify-center mr-[-0.01px] relative rounded-[8px] shrink-0 size-[48px]" data-name="Background">
      <Svg1 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-gray-800 text-nowrap">
        <p className="leading-[32px] whitespace-pre">AI Task Assignment</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-gray-500 text-nowrap">
        <p className="leading-[normal] whitespace-pre">Intelligent task distribution with automated scenario generation</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Heading />
      <Container />
    </div>
  );
}

function Margin1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start mr-[-0.01px] pl-[16px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <Container1 />
    </div>
  );
}

function Container2() {
  return (
    <div className="box-border content-stretch flex items-center pl-0 pr-[0.01px] py-0 relative shrink-0" data-name="Container">
      <Background />
      <Margin1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[15.99px]" data-name="Frame">
      <div className="absolute inset-[62.5%_33.33%_12.5%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 6">
            <path d={svgPaths.p200b58c0} id="Vector" stroke="var(--stroke-0, #1F2937)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_45.83%_54.17%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
            <path d={svgPaths.p45900} id="Vector" stroke="var(--stroke-0, #1F2937)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[63.04%_8.33%_12.5%_79.17%]" data-name="Vector">
        <div className="absolute inset-[-17.04%_-33.33%_-17.04%_-33.34%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 6">
            <path d={svgPaths.p1d178f00} id="Vector" stroke="var(--stroke-0, #1F2937)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[13.04%_20.8%_54.67%_66.67%]" data-name="Vector">
        <div className="absolute inset-[-12.91%_-33.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 7">
            <path d={svgPaths.p1b7f9320} id="Vector" stroke="var(--stroke-0, #1F2937)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Svg2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[15.99px]" data-name="SVG">
      <Frame />
    </div>
  );
}

function SvgMargin() {
  return (
    <div className="box-border content-stretch flex flex-col h-[15.99px] items-start pl-0 pr-[8px] py-0 relative shrink-0 w-[23.99px]" data-name="SVG:margin">
      <Svg2 />
    </div>
  );
}

function Button() {
  return (
    <div className="box-border content-stretch flex gap-[7.105e_-15px] h-[40px] items-center justify-center mr-[-1.137e_-13px] px-[16.909px] py-[8.909px] relative rounded-[6px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[6px]" />
      <SvgMargin />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-gray-800 text-nowrap">
        <p className="leading-[20px] whitespace-pre">Staff Management</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[15.99px]" data-name="Frame">
      <div className="absolute inset-[8.33%_66.67%_75%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-24.99%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 4">
            <path d="M0.66625 0.66625V3.33197" id="Vector" stroke="var(--stroke-0, #1F2937)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_33.33%_75%_66.67%]" data-name="Vector">
        <div className="absolute inset-[-24.99%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 4">
            <path d="M0.66625 0.66625V3.33197" id="Vector" stroke="var(--stroke-0, #1F2937)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[16.67%_12.5%_8.33%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.556%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path d={svgPaths.p15edc570} id="Vector" stroke="var(--stroke-0, #1F2937)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.67%_12.5%_58.33%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-0.67px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 2">
            <path d="M0.66625 0.66625H12.6587" id="Vector" stroke="var(--stroke-0, #1F2937)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Svg3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[15.99px]" data-name="SVG">
      <Frame1 />
    </div>
  );
}

function SvgMargin1() {
  return (
    <div className="box-border content-stretch flex flex-col h-[15.99px] items-start pl-0 pr-[8px] py-0 relative shrink-0 w-[23.99px]" data-name="SVG:margin">
      <Svg3 />
    </div>
  );
}

function Button1() {
  return (
    <div className="box-border content-stretch flex gap-[7.105e_-15px] h-[40px] items-center justify-center px-[16.909px] py-[8.909px] relative rounded-[6px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[6px]" />
      <SvgMargin1 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-gray-800 text-nowrap">
        <p className="leading-[20px] whitespace-pre">Schedule View</p>
      </div>
    </div>
  );
}

function ButtonMargin() {
  return (
    <div className="box-border content-stretch flex flex-col h-[40px] items-start mr-[-1.137e_-13px] pl-[12px] pr-0 py-0 relative shrink-0" data-name="Button:margin">
      <Button1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Button />
      <ButtonMargin />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container3 />
    </div>
  );
}

function Container5() {
  return (
    <div className="max-w-[49.889px] relative shrink-0 size-[21px]" data-name="rocket_mono_e0dedcb10b.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRocketMonoE0Dedcb10BPng} />
      </div>
    </div>
  );
}

function Svg4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d={svgPaths.p32ddfd00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-emerald-500 box-border content-stretch flex items-center justify-center mr-[-0.01px] relative rounded-[9999px] shrink-0 size-[40px]" data-name="Button">
      <Svg4 />
    </div>
  );
}

function Container6() {
  return (
    <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-gray-800 text-nowrap">
      <p className="leading-[28px] whitespace-pre">RetailFlow</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white">
          <p className="leading-[normal] whitespace-pre">Task Assignment</p>
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[#e4007f] box-border content-stretch flex items-center justify-center mr-[-0.01px] relative rounded-[8px] shrink-0 size-[32px]" data-name="Background">
      <div className="relative shrink-0 size-[20px]" data-name="SVG">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <g id="SVG">
            <path d={svgPaths.p1726bb80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p34d64900} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p33f51b00} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d="M1.66667 5.83333H18.3333" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p29492260} id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col items-start left-0 min-w-[1440px] pb-[0.909px] pt-0 px-0 top-0" data-name="Header">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="box-border content-stretch flex h-[64px] items-center justify-between px-[24px] py-0 relative shrink-0" data-name="Container">
        <div className="box-border content-stretch flex items-center pl-[15.99px] pr-0 py-0 relative shrink-0" data-name="Container">
          <div className="box-border content-stretch flex items-center pl-0 pr-[0.01px] py-0 relative shrink-0" data-name="Container">
            <Container8 />
            <div className="box-border content-stretch flex flex-col items-start mr-[-0.01px] pl-[12px] pr-0 py-0 relative shrink-0" data-name="Margin">
              <div className="box-border content-stretch flex flex-col items-start pb-[4.01px] pt-0 px-0 relative shrink-0" data-name="Container">
                <div className="box-border content-stretch flex flex-col items-start mb-[-4.01px] relative shrink-0 w-full" data-name="Heading 1">
                  <Container6 />
                </div>
                <div className="box-border content-stretch flex flex-col items-start mb-[-4.01px] relative shrink-0 w-full" data-name="Container">
                  <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
                    <p className="leading-[16px] whitespace-pre">Manager</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex items-center relative shrink-0" data-name="Nav">
          <div className="box-border content-stretch flex gap-[8.882e_-15px] items-center px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
            <div className="relative shrink-0 size-[15.99px]" data-name="SVG">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                <g id="SVG">
                  <path d={svgPaths.p251000} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
                  <path d={svgPaths.p31145b00} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
                  <path d={svgPaths.p105ae580} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
                  <path d={svgPaths.p1d1e1d00} id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
                </g>
              </svg>
            </div>
            <div className="box-border content-stretch flex flex-col items-start pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
              <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
                <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-gray-500 text-nowrap">
                  <p className="leading-[normal] whitespace-pre">Dashboard</p>
                </div>
              </div>
            </div>
          </div>
          <div className="box-border content-stretch flex flex-col items-start pl-[4px] pr-0 py-0 relative shrink-0" data-name="Button:margin">
            <div className="bg-[#e4007f] box-border content-stretch flex gap-[8.882e_-15px] items-center px-[16px] py-[8px] relative rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0" data-name="Button">
              <div className="relative shrink-0 size-[15.99px]" data-name="SVG">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <g id="SVG">
                    <path d="M7.99572 5.33072V2.665H5.33" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
                    <path d={svgPaths.p3a8be500} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
                    <path d="M1.3325 9.3275H2.66536" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
                    <path d="M13.325 9.3275H14.6579" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
                    <path d="M9.99375 8.66125V9.99411" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
                    <path d="M5.99625 8.66125V9.99411" id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
                  </g>
                </svg>
              </div>
              <Container7 />
            </div>
          </div>
          <div className="box-border content-stretch flex flex-col items-start pl-[4px] pr-0 py-0 relative shrink-0" data-name="Button:margin">
            <div className="box-border content-stretch flex gap-[8.882e_-15px] items-center px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
              <div className="relative shrink-0 size-[15.99px]" data-name="SVG">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <g id="SVG">
                    <path d={svgPaths.p30329680} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
                    <path d={svgPaths.p1e32f000} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
                    <path d={svgPaths.p17d0300} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
                    <path d={svgPaths.p1e6a8e00} id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
                  </g>
                </svg>
              </div>
              <div className="box-border content-stretch flex flex-col items-start pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
                <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
                  <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-gray-500 text-nowrap">
                    <p className="leading-[normal] whitespace-pre">Staff Management</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="box-border content-stretch flex flex-col items-start pl-[4px] pr-0 py-0 relative shrink-0" data-name="Button:margin">
            <div className="box-border content-stretch flex gap-[0.01px] items-center px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
              <div className="relative shrink-0 size-[15.99px]" data-name="SVG">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <g id="SVG">
                    <path d="M5.33 1.3325V3.99822" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
                    <path d="M10.66 1.3325V3.99822" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
                    <path d={svgPaths.p185ffc00} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
                    <path d="M1.99875 6.6625H13.9912" id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
                  </g>
                </svg>
              </div>
              <div className="box-border content-stretch flex flex-col items-start pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
                <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
                  <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-gray-500 text-nowrap">
                    <p className="leading-[normal] whitespace-pre">Scheduling</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="box-border content-stretch flex flex-col items-start pl-[4px] pr-0 py-0 relative shrink-0" data-name="Margin">
            <div className="box-border content-stretch flex gap-[8.882e_-15px] items-center px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
              <div className="relative shrink-0 size-[15.99px]" data-name="SVG">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <g id="SVG">
                    <path d={svgPaths.p12643c00} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
                    <path d={svgPaths.p3659a80} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
                    <path d={svgPaths.p2630b6a0} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
                  </g>
                </svg>
              </div>
              <div className="box-border content-stretch flex flex-col items-start pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
                <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
                  <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-gray-500 text-nowrap">
                    <p className="leading-[normal] whitespace-pre">More</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex gap-[7.105e_-15px] items-center relative shrink-0" data-name="Container">
          <div className="box-border content-stretch flex flex-col items-start p-[8px] relative rounded-[8px] shrink-0" data-name="Button">
            <div className="relative shrink-0 size-[20px]" data-name="SVG">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <g id="SVG">
                  <path d={svgPaths.p1c3efea0} id="Vector" stroke="var(--stroke-0, #1F2937)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  <path d={svgPaths.p25877f40} id="Vector_2" stroke="var(--stroke-0, #1F2937)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </g>
              </svg>
            </div>
            <div className="absolute bg-red-600 right-[-4.01px] rounded-[9999px] size-[12px] top-[-4px]" data-name="Background+Border">
              <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[9999px]" />
            </div>
          </div>
          <div className="box-border content-stretch flex flex-col items-start pl-[16px] pr-0 py-0 relative shrink-0" data-name="Margin">
            <div className="box-border content-stretch flex items-center p-[8px] relative rounded-[8px] shrink-0" data-name="Button">
              <div className="bg-indigo-500 content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background">
                <div className="relative shrink-0 size-[15.99px]" data-name="SVG">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <g id="SVG">
                      <path d={svgPaths.p3b5a6840} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
                      <path d={svgPaths.p736bc00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="box-border content-stretch flex flex-col items-start pl-[12px] pr-0 py-0 relative shrink-0" data-name="Margin">
                <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
                    <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-800 text-nowrap">
                      <p className="leading-[20px] whitespace-pre">Sarah Johnson</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
                    <div className="capitalize flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
                      <p className="leading-[16px] whitespace-pre">store manager</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box-border content-stretch flex flex-col h-[15.99px] items-start pl-[12px] pr-0 py-0 relative shrink-0 w-[27.99px]" data-name="SVG:margin">
                <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0 size-[15.99px]" data-name="SVG">
                  <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[15.99px]" data-name="Frame">
                    <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
                      <div className="absolute inset-[-16.67%_-8.33%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 6">
                          <path d={svgPaths.p7fd1800} id="Vector" stroke="var(--stroke-0, #1F2937)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="box-border content-stretch flex items-center pl-0 pr-[0.01px] py-0 relative shrink-0" data-name="Container">
      <Button2 />
      <div className="box-border content-stretch flex flex-col items-start mr-[-0.01px] pl-[12px] pr-0 py-0 relative shrink-0" data-name="Margin">
        <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
            <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-800 text-nowrap">
              <p className="leading-[20px] whitespace-pre">Step 1</p>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
            <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-800 text-nowrap">
              <p className="leading-[16px] whitespace-pre">Date Selection</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="basis-0 grow h-[2px] min-h-px min-w-px relative shrink-0" data-name="Margin">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[2px] items-start px-[16px] py-0 relative w-full">
          <div className="bg-emerald-500 h-[2px] shrink-0 w-full" data-name="Horizontal Divider" />
        </div>
      </div>
    </div>
  );
}

function Svg5() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[8.27px] right-[8.27px] top-[34.87px]" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#777777] text-[8.4px] text-center text-nowrap">
        <p className="leading-[14px] whitespace-pre">Built with</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bottom-[789.15px] content-stretch flex flex-col items-start left-[1346.66px]" data-name="Container">
      <div className="bg-white box-border content-stretch flex flex-col items-center justify-center overflow-clip p-[2.8px] relative rounded-[6px] shadow-[0px_0px_20px_2px_rgba(0,0,0,0.2)] shrink-0" data-name="Background+Shadow">
        <div className="h-[68.35px] relative rounded-[6px] shrink-0 w-[71.27px]" data-name="Border">
          <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[6px]" />
          <div className="absolute bottom-[31.08px] box-border content-stretch flex flex-col h-[29px] items-center justify-end left-[calc(50%-0.005px)] min-h-[14.7px] pb-[8px] pt-0 px-[24.084px] translate-x-[-50%] w-[69.168px]" data-name="Img:margin">
            <Container5 />
          </div>
          <Svg5 />
          <div className="absolute h-[10px] left-[8.27px] right-[8.27px] top-[50.07px]" data-name="Heading 3:margin">
            <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[-4px]" data-name="Heading 3">
              <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[9.8px] text-black text-nowrap">
                <p className="leading-[14px] whitespace-pre">Rocket.new</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-800 text-nowrap">
        <p className="leading-[20px] whitespace-pre">Step 2</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-800 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Scenario Generation</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container10 />
      <Container11 />
    </div>
  );
}

function Margin4() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[12px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <Container12 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <div className="bg-[#e4007f] box-border content-stretch flex items-center justify-center overflow-clip relative rounded-[9999px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 size-[40px]" data-name="Button">
        <div className="relative shrink-0 size-[20px]" data-name="SVG">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <g id="SVG">
              <path d="M10 6.66667V3.33333H6.66667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              <path d={svgPaths.p34a15680} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              <path d="M1.66667 11.6667H3.33333" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              <path d="M16.6667 11.6667H18.3333" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              <path d="M12.5 10.8333V12.5" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              <path d="M7.5 10.8333V12.5" id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </g>
          </svg>
        </div>
      </div>
      <Margin4 />
    </div>
  );
}

function Margin5() {
  return (
    <div className="basis-0 grow h-[2px] min-h-px min-w-px relative shrink-0" data-name="Margin">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[2px] items-start px-[16px] py-0 relative w-full">
          <div className="bg-gray-200 h-[2px] shrink-0 w-full" data-name="Horizontal Divider" />
        </div>
      </div>
    </div>
  );
}

function Svg6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d={svgPaths.p17cc7980} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3fe63d80} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-slate-100 box-border content-stretch flex items-center justify-center mr-[-0.01px] relative rounded-[9999px] shrink-0 size-[40px]" data-name="Button">
      <Svg6 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-500 text-nowrap">
        <p className="leading-[20px] whitespace-pre">Step 3</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Confirmation</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container14 />
      <Container15 />
    </div>
  );
}

function Margin6() {
  return (
    <div className="box-border content-stretch flex flex-col items-start mr-[-0.01px] pl-[12px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <Container16 />
    </div>
  );
}

function Container17() {
  return (
    <div className="box-border content-stretch flex items-center pl-0 pr-[0.01px] py-0 relative shrink-0" data-name="Container">
      <Button4 />
      <Margin6 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container9 />
      <Margin3 />
      <Container13 />
      <Margin5 />
      <Container17 />
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start pb-[16.899px] pt-[24.909px] px-[24.909px] relative w-full">
          <Container18 />
        </div>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-gray-800 text-nowrap">
        <p className="leading-[28px] whitespace-pre">AI Generated Scenarios</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-500 text-nowrap">
        <p className="leading-[20px] whitespace-pre">Choose the best assignment strategy for Monday, October 27, 2025</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Container">
      <Heading1 />
      <Container19 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[15.99px]" data-name="Frame">
      <div className="absolute bottom-1/2 left-[12.5%] right-[12.5%] top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-11.11%_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 8">
            <path d={svgPaths.p2cd25e00} id="Vector" stroke="var(--stroke-0, #1F2937)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_12.49%_66.66%_66.67%]" data-name="Vector">
        <div className="absolute inset-[-19.995%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <path d={svgPaths.p331ec400} id="Vector" stroke="var(--stroke-0, #1F2937)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[12.5%] left-[12.5%] right-[12.5%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-11.11%_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 8">
            <path d={svgPaths.p3cf42500} id="Vector" stroke="var(--stroke-0, #1F2937)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.67%_66.66%_12.49%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-19.995%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <path d={svgPaths.p23603983} id="Vector" stroke="var(--stroke-0, #1F2937)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Svg7() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[15.99px]" data-name="SVG">
      <Frame2 />
    </div>
  );
}

function SvgMargin2() {
  return (
    <div className="box-border content-stretch flex flex-col h-[15.99px] items-start pl-0 pr-[8px] py-0 relative shrink-0 w-[23.99px]" data-name="SVG:margin">
      <Svg7 />
    </div>
  );
}

function Button5() {
  return (
    <div className="box-border content-stretch flex gap-[7.105e_-15px] h-[40px] items-center justify-center px-[16.909px] py-[8.909px] relative rounded-[6px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[6px]" />
      <SvgMargin2 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-gray-800 text-nowrap">
        <p className="leading-[20px] whitespace-pre">Regenerate</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between pl-0 pr-[0.01px] py-0 relative w-full">
          <Container20 />
          <Button5 />
        </div>
      </div>
    </div>
  );
}

function Svg8() {
  return (
    <div className="relative shrink-0 size-[15.99px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p2c925bc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          <path d={svgPaths.p16ff5c00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          <path d="M4.66375 13.9913H11.3263" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          <path d="M7.995 1.99875V13.9912" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          <path d={svgPaths.p1a4ac80} id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
        </g>
      </svg>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#e4007f] box-border content-stretch flex h-[32px] items-center justify-center mr-[-0.01px] relative rounded-[8px] shrink-0 w-[20.16px]" data-name="Background">
      <Svg8 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-gray-800 text-nowrap">
        <p className="leading-[normal] whitespace-pre">Balanced</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[16px] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap whitespace-pre">
        <p className="mb-0">Optimal balance between efficiency</p>
        <p>and staff satisfaction</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col gap-[0.01px] items-start relative shrink-0" data-name="Container">
      <Heading2 />
      <Container22 />
    </div>
  );
}

function Margin7() {
  return (
    <div className="box-border content-stretch flex flex-col items-start mr-[-0.01px] pl-[12px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <Container23 />
    </div>
  );
}

function Container24() {
  return (
    <div className="box-border content-stretch flex items-center mr-[-2.842e_-14px] pl-0 pr-[0.01px] py-0 relative shrink-0" data-name="Container">
      <Background1 />
      <Margin7 />
    </div>
  );
}

function Svg9() {
  return (
    <div className="h-[19.999px] mr-[-2.842e_-14px] relative shrink-0 w-[12.84px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 20">
        <g id="SVG">
          <path d={svgPaths.p3c71bb80} id="Vector" stroke="var(--stroke-0, #E4007F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.07" />
          <path d={svgPaths.p2fc28000} id="Vector_2" stroke="var(--stroke-0, #E4007F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.07" />
        </g>
      </svg>
    </div>
  );
}

function Container25() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative w-full">
          <Container24 />
          <Svg9 />
        </div>
      </div>
    </div>
  );
}

function Svg10() {
  return (
    <div className="mr-[-0.01px] relative shrink-0 size-[14px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="SVG">
          <path d={svgPaths.p13fe3180} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p7bd4d00} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p31cee770} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p34f95e00} id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Margin8() {
  return (
    <div className="box-border content-stretch flex flex-col items-start mr-[-0.01px] pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Workload</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="box-border content-stretch flex items-center pl-0 pr-[0.01px] py-0 relative shrink-0 w-full" data-name="Container">
      <Svg10 />
      <Margin8 />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-800 w-full">
        <p className="leading-[20px]">85%</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[4px] items-start left-0 p-[12px] right-[130.86px] rounded-[8px] top-0" data-name="Container">
      <Container26 />
      <Container27 />
    </div>
  );
}

function Svg11() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="SVG">
          <path d={svgPaths.p2316b680} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M7 3.5V6.99965L9.3331 8.1662" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Margin9() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Time Est.</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Svg11 />
      <Margin9 />
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-800 w-full">
        <p className="leading-[20px]">7.5h</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[4px] items-start left-[130.87px] p-[12px] right-[-0.02px] rounded-[8px] top-0" data-name="Container">
      <Container29 />
      <Container30 />
    </div>
  );
}

function Svg12() {
  return (
    <div className="mr-[-0.01px] relative shrink-0 size-[14px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="SVG">
          <path d={svgPaths.p3231fa00} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Margin10() {
  return (
    <div className="box-border content-stretch flex flex-col items-start mr-[-0.01px] pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Satisfaction</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="box-border content-stretch flex items-center pl-0 pr-[0.01px] py-0 relative shrink-0 w-full" data-name="Container">
      <Svg12 />
      <Margin10 />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-800 w-full">
        <p className="leading-[20px]">92%</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[4px] items-start left-0 p-[12px] right-[130.86px] rounded-[8px] top-[75.99px]" data-name="Container">
      <Container32 />
      <Container33 />
    </div>
  );
}

function Svg13() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="SVG">
          <path d={svgPaths.p1977ee80} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p2e05bf80} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Margin11() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Success</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Svg13 />
      <Margin11 />
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-800 w-full">
        <p className="leading-[20px]">88%</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[4px] items-start left-[130.87px] p-[12px] right-[-0.02px] rounded-[8px] top-[75.99px]" data-name="Container">
      <Container35 />
      <Container36 />
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[139.98px] relative shrink-0 w-full" data-name="Container">
      <Container28 />
      <Container31 />
      <Container34 />
      <Container37 />
    </div>
  );
}

function Background2() {
  return (
    <div className="absolute bg-slate-100 bottom-[28px] box-border content-stretch flex items-center left-0 pb-[4.265px] pt-[3.735px] px-[8px] rounded-[6px] top-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Even distribution</p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="absolute bg-slate-100 bottom-[28px] box-border content-stretch flex items-center left-[114.79px] pb-[4.265px] pt-[3.735px] px-[8px] rounded-[6px] top-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Skill matching</p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="absolute bg-slate-100 bottom-0 box-border content-stretch flex items-center left-0 pb-[4.275px] pt-[3.725px] px-[8px] rounded-[6px] top-[28px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Break optimization</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[52px] relative shrink-0 w-full" data-name="Container">
      <Background2 />
      <Background3 />
      <Background4 />
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[12.909px] px-0 relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[0.909px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Container39 />
    </div>
  );
}

function OverlayBorderShadow() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col gap-[12px] items-start p-[16.909px] relative rounded-[8px] self-stretch shrink-0 w-[283.55px]" data-name="Overlay+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#e4007f] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Container25 />
      <Container38 />
      <HorizontalBorder />
    </div>
  );
}

function Svg14() {
  return (
    <div className="relative shrink-0 size-[15.99px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p321ca7d0} id="Vector" stroke="var(--stroke-0, #CA8A04)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
        </g>
      </svg>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-slate-100 box-border content-stretch flex h-[32px] items-center justify-center mr-[-0.01px] relative rounded-[8px] shrink-0 w-[25.84px]" data-name="Background">
      <Svg14 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-gray-800 text-nowrap">
        <p className="leading-[normal] whitespace-pre">Speed</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[16px] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap whitespace-pre">
        <p className="mb-0">Prioritizes task completion speed</p>
        <p>and urgency</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col gap-[0.01px] items-start min-w-[211.91px] relative shrink-0" data-name="Container">
      <Heading3 />
      <Container40 />
    </div>
  );
}

function Margin12() {
  return (
    <div className="box-border content-stretch flex flex-col items-start mr-[-0.01px] pl-[12px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <Container41 />
    </div>
  );
}

function Container42() {
  return (
    <div className="box-border content-stretch flex items-center pl-0 pr-[0.01px] py-0 relative shrink-0" data-name="Container">
      <Background5 />
      <Margin12 />
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Container42 />
    </div>
  );
}

function Svg15() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="SVG">
          <path d={svgPaths.p13fe3180} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p7bd4d00} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p31cee770} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p34f95e00} id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Margin13() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Workload</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Svg15 />
      <Margin13 />
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-800 w-full">
        <p className="leading-[20px]">95%</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[4px] items-start left-0 p-[12px] right-[130.86px] rounded-[8px] top-0" data-name="Container">
      <Container44 />
      <Container45 />
    </div>
  );
}

function Svg16() {
  return (
    <div className="mr-[-0.01px] relative shrink-0 size-[14px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="SVG">
          <path d={svgPaths.p2316b680} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M7 3.5V6.99965L9.3331 8.1662" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Margin14() {
  return (
    <div className="box-border content-stretch flex flex-col items-start mr-[-0.01px] pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Time Est.</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="box-border content-stretch flex items-center pl-0 pr-[0.01px] py-0 relative shrink-0 w-full" data-name="Container">
      <Svg16 />
      <Margin14 />
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-800 w-full">
        <p className="leading-[20px]">6.2h</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[4px] items-start left-[130.86px] p-[12px] right-[-0.01px] rounded-[8px] top-0" data-name="Container">
      <Container47 />
      <Container48 />
    </div>
  );
}

function Svg17() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="SVG">
          <path d={svgPaths.p3231fa00} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Margin15() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Satisfaction</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Svg17 />
      <Margin15 />
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-800 w-full">
        <p className="leading-[20px]">78%</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[4px] items-start left-0 p-[12px] right-[130.86px] rounded-[8px] top-[75.99px]" data-name="Container">
      <Container50 />
      <Container51 />
    </div>
  );
}

function Svg18() {
  return (
    <div className="mr-[-0.01px] relative shrink-0 size-[14px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="SVG">
          <path d={svgPaths.p1977ee80} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p2e05bf80} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Margin16() {
  return (
    <div className="box-border content-stretch flex flex-col items-start mr-[-0.01px] pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Success</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="box-border content-stretch flex items-center pl-0 pr-[0.01px] py-0 relative shrink-0 w-full" data-name="Container">
      <Svg18 />
      <Margin16 />
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-800 w-full">
        <p className="leading-[20px]">82%</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[4px] items-start left-[130.86px] p-[12px] right-[-0.01px] rounded-[8px] top-[75.99px]" data-name="Container">
      <Container53 />
      <Container54 />
    </div>
  );
}

function Container56() {
  return (
    <div className="h-[139.98px] relative shrink-0 w-full" data-name="Container">
      <Container46 />
      <Container49 />
      <Container52 />
      <Container55 />
    </div>
  );
}

function Background6() {
  return (
    <div className="absolute bg-slate-100 bottom-[28px] box-border content-stretch flex items-center left-0 pb-[4.265px] pt-[3.735px] px-[8px] rounded-[6px] top-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Fast completion</p>
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="absolute bg-slate-100 bottom-[28px] box-border content-stretch flex items-center left-[110.09px] pb-[4.265px] pt-[3.735px] px-[8px] rounded-[6px] top-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Priority tasks</p>
      </div>
    </div>
  );
}

function Background8() {
  return (
    <div className="absolute bg-slate-100 bottom-0 box-border content-stretch flex items-center left-0 pb-[4.275px] pt-[3.725px] px-[8px] rounded-[6px] top-[28px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Minimal breaks</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="h-[52px] relative shrink-0 w-full" data-name="Container">
      <Background6 />
      <Background7 />
      <Background8 />
    </div>
  );
}

function HorizontalBorder1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[12.909px] px-0 relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[0.909px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Container57 />
    </div>
  );
}

function Border() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[12px] items-start p-[16.909px] relative rounded-[8px] self-stretch shrink-0 w-[283.55px]" data-name="Border">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container43 />
      <Container56 />
      <HorizontalBorder1 />
    </div>
  );
}

function Svg19() {
  return (
    <div className="relative shrink-0 size-[15.99px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.pc71af00} id="Vector" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          <path d={svgPaths.p3877d900} id="Vector_2" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          <path d={svgPaths.pae71980} id="Vector_3" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
        </g>
      </svg>
    </div>
  );
}

function Background9() {
  return (
    <div className="bg-slate-100 content-stretch flex h-[32px] items-center justify-center relative rounded-[8px] shrink-0 w-[22.71px]" data-name="Background">
      <Svg19 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-gray-800 text-nowrap">
        <p className="leading-[normal] whitespace-pre">Efficiency</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[16px] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap whitespace-pre">
        <p className="mb-0">Maximizes resource utilization and</p>
        <p>cost effectiveness</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex flex-col gap-[0.01px] items-start min-w-[215.04px] relative shrink-0" data-name="Container">
      <Heading4 />
      <Container58 />
    </div>
  );
}

function Margin17() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[12px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <Container59 />
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex gap-[3.553e_-14px] items-center relative shrink-0" data-name="Container">
      <Background9 />
      <Margin17 />
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Container60 />
    </div>
  );
}

function Svg20() {
  return (
    <div className="mr-[-0.01px] relative shrink-0 size-[14px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="SVG">
          <path d={svgPaths.p13fe3180} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p7bd4d00} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p31cee770} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p34f95e00} id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Margin18() {
  return (
    <div className="box-border content-stretch flex flex-col items-start mr-[-0.01px] pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Workload</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="box-border content-stretch flex items-center pl-0 pr-[0.01px] py-0 relative shrink-0 w-full" data-name="Container">
      <Svg20 />
      <Margin18 />
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-800 w-full">
        <p className="leading-[20px]">88%</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[4px] items-start left-0 p-[12px] right-[130.86px] rounded-[8px] top-0" data-name="Container">
      <Container62 />
      <Container63 />
    </div>
  );
}

function Svg21() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="SVG">
          <path d={svgPaths.p2316b680} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M7 3.5V6.99965L9.3331 8.1662" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Margin19() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Time Est.</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Svg21 />
      <Margin19 />
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-800 w-full">
        <p className="leading-[20px]">7.8h</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[4px] items-start left-[130.87px] p-[12px] right-[-0.02px] rounded-[8px] top-0" data-name="Container">
      <Container65 />
      <Container66 />
    </div>
  );
}

function Svg22() {
  return (
    <div className="mr-[-0.01px] relative shrink-0 size-[14px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="SVG">
          <path d={svgPaths.p3231fa00} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Margin20() {
  return (
    <div className="box-border content-stretch flex flex-col items-start mr-[-0.01px] pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Satisfaction</p>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="box-border content-stretch flex items-center pl-0 pr-[0.01px] py-0 relative shrink-0 w-full" data-name="Container">
      <Svg22 />
      <Margin20 />
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-800 w-full">
        <p className="leading-[20px]">85%</p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[4px] items-start left-0 p-[12px] right-[130.86px] rounded-[8px] top-[75.99px]" data-name="Container">
      <Container68 />
      <Container69 />
    </div>
  );
}

function Svg23() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="SVG">
          <path d={svgPaths.p1977ee80} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p2e05bf80} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Margin21() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Success</p>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Svg23 />
      <Margin21 />
    </div>
  );
}

function Container72() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-800 w-full">
        <p className="leading-[20px]">90%</p>
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[4px] items-start left-[130.87px] p-[12px] right-[-0.02px] rounded-[8px] top-[75.99px]" data-name="Container">
      <Container71 />
      <Container72 />
    </div>
  );
}

function Container74() {
  return (
    <div className="h-[139.98px] relative shrink-0 w-full" data-name="Container">
      <Container64 />
      <Container67 />
      <Container70 />
      <Container73 />
    </div>
  );
}

function Background10() {
  return (
    <div className="absolute bg-slate-100 bottom-[28px] box-border content-stretch flex items-center left-0 pb-[4.265px] pt-[3.735px] px-[8px] rounded-[6px] top-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Resource optimization</p>
      </div>
    </div>
  );
}

function Background11() {
  return (
    <div className="absolute bg-slate-100 bottom-[28px] box-border content-stretch flex items-center left-[145.99px] pb-[4.265px] pt-[3.735px] px-[8px] rounded-[6px] top-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Cost effective</p>
      </div>
    </div>
  );
}

function Background12() {
  return (
    <div className="absolute bg-slate-100 bottom-0 box-border content-stretch flex items-center left-0 pb-[4.275px] pt-[3.725px] px-[8px] rounded-[6px] top-[28px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Skill utilization</p>
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="h-[52px] relative shrink-0 w-full" data-name="Container">
      <Background10 />
      <Background11 />
      <Background12 />
    </div>
  );
}

function HorizontalBorder2() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[12.909px] px-0 relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[0.909px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Container75 />
    </div>
  );
}

function Border1() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[12px] items-start p-[16.909px] relative rounded-[8px] self-stretch shrink-0 w-[283.55px]" data-name="Border">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container61 />
      <Container74 />
      <HorizontalBorder2 />
    </div>
  );
}

function Svg24() {
  return (
    <div className="relative shrink-0 size-[15.99px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p2d4c2a00} id="Vector" stroke="var(--stroke-0, #9333EA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          <path d={svgPaths.p4587300} id="Vector_2" stroke="var(--stroke-0, #9333EA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
        </g>
      </svg>
    </div>
  );
}

function Background13() {
  return (
    <div className="bg-slate-100 box-border content-stretch flex h-[32px] items-center justify-center mr-[-0.01px] relative rounded-[8px] shrink-0 w-[22.37px]" data-name="Background">
      <Svg24 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-gray-800 text-nowrap">
        <p className="leading-[normal] whitespace-pre">Custom</p>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[16px] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap whitespace-pre">
        <p className="mb-0">Tailored scenario based on your</p>
        <p>specific requirements</p>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="content-stretch flex flex-col gap-[0.01px] items-start min-w-[215.38px] relative shrink-0" data-name="Container">
      <Heading5 />
      <Container76 />
    </div>
  );
}

function Margin22() {
  return (
    <div className="box-border content-stretch flex flex-col items-start mr-[-0.01px] pl-[12px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <Container77 />
    </div>
  );
}

function Container78() {
  return (
    <div className="box-border content-stretch flex items-center pl-0 pr-[0.01px] py-0 relative shrink-0" data-name="Container">
      <Background13 />
      <Margin22 />
    </div>
  );
}

function Container79() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Container78 />
    </div>
  );
}

function Svg25() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="SVG">
          <path d={svgPaths.p13fe3180} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p7bd4d00} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p31cee770} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p34f95e00} id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Margin23() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Workload</p>
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Svg25 />
      <Margin23 />
    </div>
  );
}

function Container81() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-800 w-full">
        <p className="leading-[20px]">82%</p>
      </div>
    </div>
  );
}

function Container82() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[4px] items-start left-0 p-[12px] right-[130.86px] rounded-[8px] top-0" data-name="Container">
      <Container80 />
      <Container81 />
    </div>
  );
}

function Svg26() {
  return (
    <div className="mr-[-0.01px] relative shrink-0 size-[14px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="SVG">
          <path d={svgPaths.p2316b680} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M7 3.5V6.99965L9.3331 8.1662" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Margin24() {
  return (
    <div className="box-border content-stretch flex flex-col items-start mr-[-0.01px] pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Time Est.</p>
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="box-border content-stretch flex items-center pl-0 pr-[0.01px] py-0 relative shrink-0 w-full" data-name="Container">
      <Svg26 />
      <Margin24 />
    </div>
  );
}

function Container84() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-800 w-full">
        <p className="leading-[20px]">8.0h</p>
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[4px] items-start left-[130.86px] p-[12px] right-[-0.01px] rounded-[8px] top-0" data-name="Container">
      <Container83 />
      <Container84 />
    </div>
  );
}

function Svg27() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="SVG">
          <path d={svgPaths.p3231fa00} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Margin25() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Satisfaction</p>
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Svg27 />
      <Margin25 />
    </div>
  );
}

function Container87() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-800 w-full">
        <p className="leading-[20px]">95%</p>
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[4px] items-start left-0 p-[12px] right-[130.86px] rounded-[8px] top-[75.99px]" data-name="Container">
      <Container86 />
      <Container87 />
    </div>
  );
}

function Svg28() {
  return (
    <div className="mr-[-0.01px] relative shrink-0 size-[14px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="SVG">
          <path d={svgPaths.p1977ee80} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p2e05bf80} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Margin26() {
  return (
    <div className="box-border content-stretch flex flex-col items-start mr-[-0.01px] pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Success</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="box-border content-stretch flex items-center pl-0 pr-[0.01px] py-0 relative shrink-0 w-full" data-name="Container">
      <Svg28 />
      <Margin26 />
    </div>
  );
}

function Container90() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-800 w-full">
        <p className="leading-[20px]">85%</p>
      </div>
    </div>
  );
}

function Container91() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[4px] items-start left-[130.86px] p-[12px] right-[-0.01px] rounded-[8px] top-[75.99px]" data-name="Container">
      <Container89 />
      <Container90 />
    </div>
  );
}

function Container92() {
  return (
    <div className="h-[139.98px] relative shrink-0 w-full" data-name="Container">
      <Container82 />
      <Container85 />
      <Container88 />
      <Container91 />
    </div>
  );
}

function Background14() {
  return (
    <div className="absolute bg-slate-100 bottom-[28px] box-border content-stretch flex items-center left-0 pb-[4.265px] pt-[3.735px] px-[8px] rounded-[6px] top-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Custom rules</p>
      </div>
    </div>
  );
}

function Background15() {
  return (
    <div className="absolute bg-slate-100 bottom-[28px] box-border content-stretch flex items-center left-[94.93px] pb-[4.265px] pt-[3.735px] px-[8px] rounded-[6px] top-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Flexible timing</p>
      </div>
    </div>
  );
}

function Background16() {
  return (
    <div className="absolute bg-slate-100 bottom-0 box-border content-stretch flex items-center left-0 pb-[4.275px] pt-[3.725px] px-[8px] rounded-[6px] top-[28px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Personal preferences</p>
      </div>
    </div>
  );
}

function Container93() {
  return (
    <div className="h-[52px] relative shrink-0 w-full" data-name="Container">
      <Background14 />
      <Background15 />
      <Background16 />
    </div>
  );
}

function HorizontalBorder3() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[12.909px] px-0 relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[0.909px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Container93 />
    </div>
  );
}

function Border2() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[12px] items-start p-[16.909px] relative rounded-[8px] self-stretch shrink-0 w-[283.55px]" data-name="Border">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container79 />
      <Container92 />
      <HorizontalBorder3 />
    </div>
  );
}

function Container94() {
  return (
    <div className="content-stretch flex gap-[16px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <OverlayBorderShadow />
      <Border />
      <Border1 />
      <Border2 />
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[24.909px] relative w-full">
          <Container21 />
          <Container94 />
        </div>
      </div>
    </div>
  );
}

function Svg29() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d={svgPaths.p140c1100} id="Vector" stroke="var(--stroke-0, #E4007F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M15 14.1667V7.5" id="Vector_2" stroke="var(--stroke-0, #E4007F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10.8333 14.1667V4.16667" id="Vector_3" stroke="var(--stroke-0, #E4007F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M6.66667 14.1667V11.6667" id="Vector_4" stroke="var(--stroke-0, #E4007F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Heading6() {
  return (
    <div className="box-border content-stretch flex flex-col items-start mb-[-8.171e_-14px] relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-gray-800 text-nowrap">
        <p className="leading-[normal] whitespace-pre">Task Assignment Visualization</p>
      </div>
    </div>
  );
}

function Container95() {
  return (
    <div className="box-border content-stretch flex flex-col items-start mb-[-8.171e_-14px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-500 text-nowrap">
        <p className="leading-[20px] whitespace-pre">Balanced Scenario</p>
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Heading6 />
      <Container95 />
    </div>
  );
}

function Margin27() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[12px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <Container96 />
    </div>
  );
}

function Container97() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Svg29 />
      <Margin27 />
    </div>
  );
}

function Svg30() {
  return (
    <div className="absolute left-[11.99px] size-[15.99px] top-[7.18px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p91fd840} id="Vector" stroke="var(--stroke-0, #1F2937)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          <path d="M11.9925 11.3262V5.99625" id="Vector_2" stroke="var(--stroke-0, #1F2937)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          <path d="M8.66125 11.3263V3.33125" id="Vector_3" stroke="var(--stroke-0, #1F2937)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          <path d="M5.33 11.3268V9.3275" id="Vector_4" stroke="var(--stroke-0, #1F2937)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-white h-[28px] relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-[79.72px]" data-name="Button">
      <Svg30 />
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] left-[calc(50%+10.48px)] not-italic text-[14px] text-center text-gray-800 top-[calc(50%-0.23px)] translate-x-[-50%] translate-y-[-50%] w-[36.7px]">
        <p className="leading-[20px]">Gantt</p>
      </div>
    </div>
  );
}

function Svg31() {
  return (
    <div className="absolute left-[12px] size-[15.99px] top-[7.18px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d="M1.99875 7.995H2.00541" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          <path d="M1.99875 11.9925H2.00541" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          <path d="M1.99875 3.9975H2.00541" id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          <path d="M5.33 7.995H13.9912" id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          <path d="M5.33 11.9925H13.9912" id="Vector_5" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          <path d="M5.33 3.9975H13.9912" id="Vector_6" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="h-[28px] relative rounded-[6px] shrink-0 w-[67.27px]" data-name="Button">
      <Svg31 />
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] left-[calc(50%+10.165px)] not-italic text-[14px] text-center text-gray-500 top-[calc(50%-0.23px)] translate-x-[-50%] translate-y-[-50%] w-[23.619px]">
        <p className="leading-[20px]">List</p>
      </div>
    </div>
  );
}

function Background17() {
  return (
    <div className="bg-slate-100 box-border content-stretch flex gap-[2.842e_-14px] items-center mr-[-0.01px] p-[4px] relative rounded-[8px] shrink-0" data-name="Background">
      <Button6 />
      <Button7 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[14px]" data-name="Frame">
      <div className="absolute inset-[12.5%_12.5%_62.5%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-16.668%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <path d={svgPaths.p9c63f00} id="Vector" stroke="var(--stroke-0, #1F2937)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[62.5%_62.5%_12.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-16.668%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <path d={svgPaths.p3efafd00} id="Vector" stroke="var(--stroke-0, #1F2937)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_12.5%_58.34%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-14.287%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
            <path d={svgPaths.p25bade00} id="Vector" stroke="var(--stroke-0, #1F2937)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[58.33%_58.34%_12.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-14.287%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
            <path d={svgPaths.p9804700} id="Vector" stroke="var(--stroke-0, #1F2937)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Svg32() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[14px]" data-name="SVG">
      <Frame3 />
    </div>
  );
}

function SvgMargin3() {
  return (
    <div className="box-border content-stretch flex flex-col h-[14px] items-start mr-[-0.01px] pl-0 pr-[8px] py-0 relative shrink-0 w-[22px]" data-name="SVG:margin">
      <Svg32 />
    </div>
  );
}

function Button8() {
  return (
    <div className="box-border content-stretch flex h-[35.99px] items-center justify-center pl-[12.909px] pr-[12.919px] py-[0.909px] relative rounded-[6px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[6px]" />
      <SvgMargin3 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] mr-[-0.01px] not-italic relative shrink-0 text-[14px] text-center text-gray-800 text-nowrap">
        <p className="leading-[20px] whitespace-pre">Full Screen</p>
      </div>
    </div>
  );
}

function ButtonMargin1() {
  return (
    <div className="box-border content-stretch flex flex-col h-[35.99px] items-start mr-[-0.01px] pl-[8px] pr-0 py-0 relative shrink-0" data-name="Button:margin">
      <Button8 />
    </div>
  );
}

function Container98() {
  return (
    <div className="box-border content-stretch flex items-center pl-0 pr-[0.01px] py-0 relative shrink-0" data-name="Container">
      <Background17 />
      <ButtonMargin1 />
    </div>
  );
}

function HorizontalBorder4() {
  return (
    <div className="relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between pb-[16.909px] pt-[16px] px-[15.99px] relative w-full">
          <Container97 />
          <Container98 />
        </div>
      </div>
    </div>
  );
}

function Background18() {
  return (
    <div className="bg-slate-100 box-border content-stretch flex flex-col items-start p-[12px] relative self-stretch shrink-0 w-[192px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-800 text-nowrap">
        <p className="leading-[20px] whitespace-pre">Staff Member</p>
      </div>
    </div>
  );
}

function BackgroundVerticalBorder() {
  return (
    <div className="basis-0 bg-slate-100 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Background+VerticalBorder">
      <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col items-center pl-[12.909px] pr-[12px] py-[12px] relative size-full">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-gray-800 w-full">
            <p className="leading-[20px]">08:00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundVerticalBorder1() {
  return (
    <div className="basis-0 bg-slate-100 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Background+VerticalBorder">
      <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col items-center pl-[12.909px] pr-[12px] py-[12px] relative size-full">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-gray-800 w-full">
            <p className="leading-[20px]">09:00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundVerticalBorder2() {
  return (
    <div className="basis-0 bg-slate-100 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Background+VerticalBorder">
      <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col items-center pl-[12.909px] pr-[12px] py-[12px] relative size-full">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-gray-800 w-full">
            <p className="leading-[20px]">10:00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundVerticalBorder3() {
  return (
    <div className="basis-0 bg-slate-100 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Background+VerticalBorder">
      <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col items-center pl-[12.909px] pr-[12px] py-[12px] relative size-full">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-gray-800 w-full">
            <p className="leading-[20px]">11:00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundVerticalBorder4() {
  return (
    <div className="basis-0 bg-slate-100 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Background+VerticalBorder">
      <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col items-center pl-[12.909px] pr-[12px] py-[12px] relative size-full">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-gray-800 w-full">
            <p className="leading-[20px]">12:00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundVerticalBorder5() {
  return (
    <div className="basis-0 bg-slate-100 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Background+VerticalBorder">
      <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col items-center pl-[12.909px] pr-[12px] py-[12px] relative size-full">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-gray-800 w-full">
            <p className="leading-[20px]">13:00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundVerticalBorder6() {
  return (
    <div className="basis-0 bg-slate-100 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Background+VerticalBorder">
      <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col items-center pl-[12.909px] pr-[12px] py-[12px] relative size-full">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-gray-800 w-full">
            <p className="leading-[20px]">14:00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundVerticalBorder7() {
  return (
    <div className="basis-0 bg-slate-100 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Background+VerticalBorder">
      <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col items-center pl-[12.909px] pr-[12px] py-[12px] relative size-full">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-gray-800 w-full">
            <p className="leading-[20px]">15:00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundVerticalBorder8() {
  return (
    <div className="basis-0 bg-slate-100 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Background+VerticalBorder">
      <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col items-center pl-[12.909px] pr-[12px] py-[12px] relative size-full">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-gray-800 w-full">
            <p className="leading-[20px]">16:00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundVerticalBorder9() {
  return (
    <div className="basis-0 bg-slate-100 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Background+VerticalBorder">
      <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col items-center pl-[12.909px] pr-[12px] py-[12px] relative size-full">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-gray-800 w-full">
            <p className="leading-[20px]">17:00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder5() {
  return (
    <div className="box-border content-stretch flex items-start pb-[0.909px] pt-0 px-0 relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Background18 />
      <BackgroundVerticalBorder />
      <BackgroundVerticalBorder1 />
      <BackgroundVerticalBorder2 />
      <BackgroundVerticalBorder3 />
      <BackgroundVerticalBorder4 />
      <BackgroundVerticalBorder5 />
      <BackgroundVerticalBorder6 />
      <BackgroundVerticalBorder7 />
      <BackgroundVerticalBorder8 />
      <BackgroundVerticalBorder9 />
    </div>
  );
}

function ProfessionalWomanWithShoulderLengthBrownHairInWhiteBlouse() {
  return (
    <div className="max-w-[192px] mr-[-0.01px] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Professional woman with shoulder-length brown hair in white blouse">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
        <img alt="" className="absolute h-[149.98%] left-0 max-w-none top-[-24.99%] w-full" src={imgProfessionalWomanWithShoulderLengthBrownHairInWhiteBlouse} />
      </div>
    </div>
  );
}

function Container99() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-800 text-nowrap">
        <p className="leading-[20px] whitespace-pre">Sarah Johnson</p>
      </div>
    </div>
  );
}

function Container100() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Floor Manager</p>
      </div>
    </div>
  );
}

function Container101() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container99 />
      <Container100 />
    </div>
  );
}

function Margin28() {
  return (
    <div className="box-border content-stretch flex flex-col items-start mr-[-0.01px] pl-[12px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <Container101 />
    </div>
  );
}

function Container102() {
  return (
    <div className="box-border content-stretch flex items-center mr-[-2.842e_-14px] pl-[12px] pr-[12.01px] py-[12px] relative self-stretch shrink-0 w-[192px]" data-name="Container">
      <ProfessionalWomanWithShoulderLengthBrownHairInWhiteBlouse />
      <Margin28 />
    </div>
  );
}

function Container103() {
  return (
    <div className="content-stretch flex h-[64px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="VerticalBorder">
        <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      </div>
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="VerticalBorder">
        <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      </div>
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="VerticalBorder">
        <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      </div>
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="VerticalBorder">
        <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      </div>
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="VerticalBorder">
        <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      </div>
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="VerticalBorder">
        <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      </div>
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="VerticalBorder">
        <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      </div>
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="VerticalBorder">
        <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      </div>
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="VerticalBorder">
        <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      </div>
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="VerticalBorder">
        <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[8px] relative w-full">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-full">
            <p className="leading-[16px]">Morning Bri…</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="absolute bg-gray-400 box-border content-stretch flex flex-col h-[48px] items-start left-0 p-[1.818px] right-[90%] rounded-[6px] top-[8px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-red-400 border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Container104 />
    </div>
  );
}

function Container105() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[8px] relative w-full">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-full">
            <p className="leading-[16px]">Inventory Check</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="absolute bg-blue-500 box-border content-stretch flex flex-col h-[48px] items-start left-[20%] p-[1.818px] right-[60%] rounded-[6px] top-[8px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-solid border-yellow-400 inset-0 pointer-events-none rounded-[6px]" />
      <Container105 />
    </div>
  );
}

function Container106() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[8px] relative w-full">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-full">
            <p className="leading-[16px]">Customer Service</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder4() {
  return (
    <div className="absolute bg-gray-400 box-border content-stretch flex flex-col h-[48px] items-start left-[50%] p-[1.818px] right-[20%] rounded-[6px] top-[8px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-green-400 border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Container106 />
    </div>
  );
}

function Container107() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow items-start min-h-px min-w-px mr-[-2.842e_-14px] relative self-stretch shrink-0" data-name="Container">
      <Container103 />
      <BackgroundBorder2 />
      <BackgroundBorder3 />
      <BackgroundBorder4 />
    </div>
  );
}

function HorizontalBorder6() {
  return (
    <div className="box-border content-stretch flex items-start pb-[0.909px] pt-0 px-0 relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Container102 />
      <Container107 />
    </div>
  );
}

function AsianManWithShortBlackHairWearingNavyBlueShirt() {
  return (
    <div className="max-w-[192px] mr-[-0.01px] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Asian man with short black hair wearing navy blue shirt">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
        <img alt="" className="absolute h-[150%] left-0 max-w-none top-[-25%] w-full" src={imgAsianManWithShortBlackHairWearingNavyBlueShirt} />
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-800 text-nowrap">
        <p className="leading-[20px] whitespace-pre">Mike Chen</p>
      </div>
    </div>
  );
}

function Container109() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Sales Associate</p>
      </div>
    </div>
  );
}

function Container110() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container108 />
      <Container109 />
    </div>
  );
}

function Margin29() {
  return (
    <div className="box-border content-stretch flex flex-col items-start mr-[-0.01px] pl-[12px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <Container110 />
    </div>
  );
}

function Container111() {
  return (
    <div className="box-border content-stretch flex items-center mr-[-2.842e_-14px] pl-[12px] pr-[12.01px] py-[12px] relative self-stretch shrink-0 w-[192px]" data-name="Container">
      <AsianManWithShortBlackHairWearingNavyBlueShirt />
      <Margin29 />
    </div>
  );
}

function Container112() {
  return (
    <div className="content-stretch flex h-[64px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="VerticalBorder">
        <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      </div>
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="VerticalBorder">
        <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      </div>
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="VerticalBorder">
        <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      </div>
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="VerticalBorder">
        <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      </div>
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="VerticalBorder">
        <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      </div>
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="VerticalBorder">
        <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      </div>
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="VerticalBorder">
        <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      </div>
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="VerticalBorder">
        <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      </div>
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="VerticalBorder">
        <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      </div>
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="VerticalBorder">
        <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Container113() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[8px] relative w-full">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-full">
            <p className="leading-[16px]">Store Openi…</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder5() {
  return (
    <div className="absolute bg-green-500 box-border content-stretch flex flex-col h-[48px] items-start left-0 p-[1.818px] right-[90%] rounded-[6px] top-[8px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-red-400 border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Container113 />
    </div>
  );
}

function Container114() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[8px] relative w-full">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-full">
            <p className="leading-[16px]">Product Display</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder6() {
  return (
    <div className="absolute bg-gray-400 box-border content-stretch flex flex-col h-[48px] items-start left-[10%] p-[1.818px] right-[60%] rounded-[6px] top-[8px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-solid border-yellow-400 inset-0 pointer-events-none rounded-[6px]" />
      <Container114 />
    </div>
  );
}

function Container115() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[8px] relative w-full">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-full">
            <p className="leading-[16px]">Sales Support</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder7() {
  return (
    <div className="absolute bg-gray-400 box-border content-stretch flex flex-col h-[48px] items-start left-[60%] p-[1.818px] right-[20%] rounded-[6px] top-[8px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-red-400 border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Container115 />
    </div>
  );
}

function Container116() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow items-start min-h-px min-w-px mr-[-2.842e_-14px] relative self-stretch shrink-0" data-name="Container">
      <Container112 />
      <BackgroundBorder5 />
      <BackgroundBorder6 />
      <BackgroundBorder7 />
    </div>
  );
}

function HorizontalBorder7() {
  return (
    <div className="box-border content-stretch flex items-start pb-[0.909px] pt-0 px-0 relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Container111 />
      <Container116 />
    </div>
  );
}

function HispanicWomanWithLongDarkHairInProfessionalAttire() {
  return (
    <div className="max-w-[192px] mr-[-0.01px] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Hispanic woman with long dark hair in professional attire">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
        <img alt="" className="absolute h-[146.15%] left-0 max-w-none top-[-23.08%] w-full" src={imgHispanicWomanWithLongDarkHairInProfessionalAttire} />
      </div>
    </div>
  );
}

function Container117() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-800 text-nowrap">
        <p className="leading-[20px] whitespace-pre">Emily Rodriguez</p>
      </div>
    </div>
  );
}

function Container118() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Cashier</p>
      </div>
    </div>
  );
}

function Container119() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container117 />
      <Container118 />
    </div>
  );
}

function Margin30() {
  return (
    <div className="box-border content-stretch flex flex-col items-start mr-[-0.01px] pl-[12px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <Container119 />
    </div>
  );
}

function Container120() {
  return (
    <div className="box-border content-stretch flex items-center mr-[-2.842e_-14px] pl-[12px] pr-[12.01px] py-[12px] relative self-stretch shrink-0 w-[192px]" data-name="Container">
      <HispanicWomanWithLongDarkHairInProfessionalAttire />
      <Margin30 />
    </div>
  );
}

function Container121() {
  return (
    <div className="content-stretch flex h-[64px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="VerticalBorder">
        <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      </div>
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="VerticalBorder">
        <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      </div>
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="VerticalBorder">
        <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      </div>
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="VerticalBorder">
        <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      </div>
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="VerticalBorder">
        <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      </div>
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="VerticalBorder">
        <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      </div>
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="VerticalBorder">
        <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      </div>
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="VerticalBorder">
        <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      </div>
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="VerticalBorder">
        <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      </div>
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="VerticalBorder">
        <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Container122() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[8px] relative w-full">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-full">
            <p className="leading-[16px]">Register Set…</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder8() {
  return (
    <div className="absolute bg-green-500 box-border content-stretch flex flex-col h-[48px] items-start left-0 p-[1.818px] right-[90%] rounded-[6px] top-[7.99px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-red-400 border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Container122 />
    </div>
  );
}

function Container123() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[8px] relative w-full">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-full">
            <p className="leading-[16px]">Cash Handling</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder9() {
  return (
    <div className="absolute bg-blue-500 box-border content-stretch flex flex-col h-[48px] items-start left-[20%] p-[1.818px] right-[20%] rounded-[6px] top-[7.99px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-red-400 border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Container123 />
    </div>
  );
}

function Container124() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow items-start min-h-px min-w-px mr-[-2.842e_-14px] relative self-stretch shrink-0" data-name="Container">
      <Container121 />
      <BackgroundBorder8 />
      <BackgroundBorder9 />
    </div>
  );
}

function HorizontalBorder8() {
  return (
    <div className="box-border content-stretch flex items-start pb-[0.909px] pt-0 px-0 relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.909px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Container120 />
      <Container124 />
    </div>
  );
}

function Container125() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[800px] overflow-auto relative shrink-0 w-full" data-name="Container">
      <HorizontalBorder5 />
      <HorizontalBorder6 />
      <HorizontalBorder7 />
      <HorizontalBorder8 />
    </div>
  );
}

function Container126() {
  return (
    <div className="max-h-[384px] relative shrink-0 w-full" data-name="Container">
      <div className="max-h-inherit overflow-auto size-full">
        <div className="box-border content-stretch flex flex-col items-start max-h-inherit p-[16px] relative w-full">
          <Container125 />
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder10() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[1.421e_-14px] items-start p-[0.909px] relative w-full">
          <HorizontalBorder4 />
          <Container126 />
        </div>
      </div>
    </div>
  );
}

function Svg33() {
  return (
    <div className="mr-[-0.01px] relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #E4007F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p240d7000} id="Vector_2" stroke="var(--stroke-0, #E4007F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p25499600} id="Vector_3" stroke="var(--stroke-0, #E4007F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Heading3Margin() {
  return (
    <div className="box-border content-stretch flex flex-col items-start mr-[-0.01px] pl-[12px] pr-0 py-0 relative shrink-0" data-name="Heading 3:margin">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-gray-800 text-nowrap">
        <p className="leading-[normal] whitespace-pre">Assignment Scorecard</p>
      </div>
    </div>
  );
}

function Container127() {
  return (
    <div className="box-border content-stretch flex items-center pl-0 pr-[0.01px] py-0 relative shrink-0 w-full" data-name="Container">
      <Svg33 />
      <Heading3Margin />
    </div>
  );
}

function Container128() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-center text-gray-800 w-full">
        <p className="leading-[32px]">85%</p>
      </div>
    </div>
  );
}

function Container129() {
  return (
    <div className="box-border content-stretch flex flex-col items-center pb-[4px] pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-gray-500 w-full">
        <p className="leading-[20px]">Staff Utilization</p>
      </div>
    </div>
  );
}

function Background19() {
  return (
    <div className="bg-gray-200 h-[8px] relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#e4007f] h-[8px] left-0 right-[15%] rounded-[9999px] top-0" data-name="Background" />
    </div>
  );
}

function Background20() {
  return (
    <div className="bg-slate-100 box-border content-stretch flex flex-col gap-[4px] items-start p-[16px] relative rounded-[8px] self-stretch shrink-0 w-[283.55px]" data-name="Background">
      <Container128 />
      <Container129 />
      <Background19 />
    </div>
  );
}

function Container130() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-center text-gray-800 w-full">
        <p className="leading-[32px]">7.5h</p>
      </div>
    </div>
  );
}

function Container131() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-gray-500 w-full">
        <p className="leading-[20px]">Estimated Duration</p>
      </div>
    </div>
  );
}

function Svg34() {
  return (
    <div className="relative shrink-0 size-[15.99px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.pc71af00} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          <path d={svgPaths.p112be700} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
        </g>
      </svg>
    </div>
  );
}

function Container132() {
  return (
    <div className="box-border content-stretch flex items-center justify-center pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Container">
      <Svg34 />
    </div>
  );
}

function Background21() {
  return (
    <div className="bg-slate-100 box-border content-stretch flex flex-col gap-[4px] items-start p-[16px] relative rounded-[8px] self-stretch shrink-0 w-[283.55px]" data-name="Background">
      <Container130 />
      <Container131 />
      <Container132 />
    </div>
  );
}

function Container133() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-center text-gray-800 w-full">
        <p className="leading-[32px]">92%</p>
      </div>
    </div>
  );
}

function Container134() {
  return (
    <div className="box-border content-stretch flex flex-col items-center pb-[4px] pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-gray-500 w-full">
        <p className="leading-[20px]">Staff Satisfaction</p>
      </div>
    </div>
  );
}

function Background22() {
  return (
    <div className="bg-gray-200 h-[8px] relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-green-500 h-[8px] left-0 right-[8%] rounded-[9999px] top-0" data-name="Background" />
    </div>
  );
}

function Background23() {
  return (
    <div className="bg-slate-100 box-border content-stretch flex flex-col gap-[4px] items-start p-[16px] relative rounded-[8px] self-stretch shrink-0 w-[283.55px]" data-name="Background">
      <Container133 />
      <Container134 />
      <Background22 />
    </div>
  );
}

function Container135() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-center text-gray-800 w-full">
        <p className="leading-[32px]">88%</p>
      </div>
    </div>
  );
}

function Container136() {
  return (
    <div className="box-border content-stretch flex flex-col items-center pb-[4px] pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-gray-500 w-full">
        <p className="leading-[20px]">Success Probability</p>
      </div>
    </div>
  );
}

function Background24() {
  return (
    <div className="bg-gray-200 h-[8px] relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-blue-500 h-[8px] left-0 right-[12%] rounded-[9999px] top-0" data-name="Background" />
    </div>
  );
}

function Background25() {
  return (
    <div className="bg-slate-100 box-border content-stretch flex flex-col gap-[4px] items-start p-[16px] relative rounded-[8px] self-stretch shrink-0 w-[283.55px]" data-name="Background">
      <Container135 />
      <Container136 />
      <Background24 />
    </div>
  );
}

function Container137() {
  return (
    <div className="content-stretch flex gap-[16px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Background20 />
      <Background21 />
      <Background23 />
      <Background25 />
    </div>
  );
}

function BackgroundBorder11() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[24.909px] relative w-full">
          <Container127 />
          <Container137 />
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[15.99px]" data-name="Frame">
      <div className="absolute bottom-[20.83%] left-[20.83%] right-1/2 top-[20.83%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 11">
            <path d={svgPaths.p9051780} id="Vector" stroke="var(--stroke-0, #1F2937)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.67px_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 2">
            <path d="M9.99375 0.66625H0.66625" id="Vector" stroke="var(--stroke-0, #1F2937)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Svg35() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[15.99px]" data-name="SVG">
      <Frame4 />
    </div>
  );
}

function SvgMargin4() {
  return (
    <div className="box-border content-stretch flex flex-col h-[15.99px] items-start mr-[-2.132e_-14px] pl-0 pr-[8px] py-0 relative shrink-0 w-[23.99px]" data-name="SVG:margin">
      <Svg35 />
    </div>
  );
}

function Button9() {
  return (
    <div className="box-border content-stretch flex h-[40px] items-center justify-center px-[16.909px] py-[8.909px] relative rounded-[6px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[6px]" />
      <SvgMargin4 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] mr-[-2.132e_-14px] not-italic relative shrink-0 text-[14px] text-center text-gray-800 text-nowrap">
        <p className="leading-[20px] whitespace-pre">Back to Date Selection</p>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[15.99px]" data-name="Frame">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.556%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path d={svgPaths.p273a0a80} id="Vector" stroke="var(--stroke-0, #1F2937)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.35%_8.35%_33.32%_33.32%]" data-name="Vector">
        <div className="absolute inset-[-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
            <path d={svgPaths.p357cf880} id="Vector" stroke="var(--stroke-0, #1F2937)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Svg36() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[15.99px]" data-name="SVG">
      <Frame5 />
    </div>
  );
}

function SvgMargin5() {
  return (
    <div className="box-border content-stretch flex flex-col h-[15.99px] items-start pl-0 pr-[8px] py-0 relative shrink-0 w-[23.99px]" data-name="SVG:margin">
      <Svg36 />
    </div>
  );
}

function Button10() {
  return (
    <div className="box-border content-stretch flex gap-[7.105e_-15px] h-[40px] items-center justify-center mr-[-8.527e_-14px] px-[16.909px] py-[8.909px] relative rounded-[6px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[6px]" />
      <SvgMargin5 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-gray-800 text-nowrap">
        <p className="leading-[20px] whitespace-pre">Manual Edit</p>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[15.99px]" data-name="Frame">
      <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.67px_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 2">
            <path d="M0.66625 0.66625H9.99375" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[20.83%] left-1/2 right-[20.83%] top-[20.83%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 11">
            <path d={svgPaths.p1ae25b00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3325" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Svg37() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[15.99px]" data-name="SVG">
      <Frame6 />
    </div>
  );
}

function SvgMargin6() {
  return (
    <div className="box-border content-stretch flex flex-col h-[15.99px] items-start mr-[-0.01px] pl-[8px] pr-0 py-0 relative shrink-0 w-[23.99px]" data-name="SVG:margin">
      <Svg37 />
    </div>
  );
}

function Button11() {
  return (
    <div className="bg-[#e4007f] box-border content-stretch flex h-[40px] items-center justify-center pl-[16px] pr-[16.01px] py-[8px] relative rounded-[6px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] mr-[-0.01px] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white">
        <p className="leading-[20px] whitespace-pre">{`Review & Confirm`}</p>
      </div>
      <SvgMargin6 />
    </div>
  );
}

function ButtonMargin2() {
  return (
    <div className="box-border content-stretch flex flex-col h-[40px] items-start mr-[-8.527e_-14px] pl-[12px] pr-0 py-0 relative shrink-0" data-name="Button:margin">
      <Button11 />
    </div>
  );
}

function Container138() {
  return (
    <div className="content-stretch flex items-start relative self-stretch shrink-0" data-name="Container">
      <Button10 />
      <ButtonMargin2 />
    </div>
  );
}

function Container139() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Button9 />
      <Container138 />
    </div>
  );
}

function Container140() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Container">
      <BackgroundBorder1 />
      <BackgroundBorder10 />
      <BackgroundBorder11 />
      <Container139 />
    </div>
  );
}

function Svg38() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #2563EB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p22540600} id="Vector_2" stroke="var(--stroke-0, #2563EB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 14.1667H10.0083" id="Vector_3" stroke="var(--stroke-0, #2563EB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Background26() {
  return (
    <div className="bg-blue-100 box-border content-stretch flex items-center justify-center mr-[-0.01px] relative rounded-[8px] shrink-0 size-[40px]" data-name="Background">
      <Svg38 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-gray-800 w-full">
        <p className="leading-[normal]">Need Help with AI Task Assignment?</p>
      </div>
    </div>
  );
}

function Container141() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[20px] not-italic relative shrink-0 text-[14px] text-gray-500 w-full">
        <p className="mb-0">Our AI system analyzes staff availability, skills, and workload to generate optimal task assignments. You can choose from different scenarios or manually adjust</p>
        <p>assignments as needed.</p>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[14px]" data-name="Frame">
      <div className="absolute inset-[8.33%_16.67%_8.33%_16.66%]" data-name="Vector">
        <div className="absolute inset-[-5%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 13">
            <path d={svgPaths.p1e917bc0} id="Vector" stroke="var(--stroke-0, #1F2937)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Svg39() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[14px]" data-name="SVG">
      <Frame7 />
    </div>
  );
}

function SvgMargin7() {
  return (
    <div className="box-border content-stretch flex flex-col h-[14px] items-start mr-[-0.01px] pl-0 pr-[8px] py-0 relative shrink-0 w-[22px]" data-name="SVG:margin">
      <Svg39 />
    </div>
  );
}

function Button12() {
  return (
    <div className="box-border content-stretch flex h-[35.99px] items-center justify-center pl-[12.909px] pr-[12.919px] py-[0.909px] relative rounded-[6px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[6px]" />
      <SvgMargin7 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] mr-[-0.01px] not-italic relative shrink-0 text-[14px] text-center text-gray-800 text-nowrap">
        <p className="leading-[20px] whitespace-pre">View Guide</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[14px]" data-name="Frame">
      <div className="absolute inset-[12.47%_12.47%_8.34%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5.26%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
            <path d={svgPaths.p24b42880} id="Vector" stroke="var(--stroke-0, #1F2937)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Svg40() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[14px]" data-name="SVG">
      <Frame8 />
    </div>
  );
}

function SvgMargin8() {
  return (
    <div className="box-border content-stretch flex flex-col h-[14px] items-start pl-0 pr-[8px] py-0 relative shrink-0 w-[22px]" data-name="SVG:margin">
      <Svg40 />
    </div>
  );
}

function Button13() {
  return (
    <div className="box-border content-stretch flex h-[35.99px] items-center justify-center px-[12.909px] py-[0.909px] relative rounded-[6px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[6px]" />
      <SvgMargin8 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-gray-800 text-nowrap">
        <p className="leading-[20px] whitespace-pre">Contact Support</p>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[14px]" data-name="Frame">
      <div className="absolute inset-[30.71%_8.34%_30.98%_66.67%]" data-name="Vector">
        <div className="absolute inset-[-10.88%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 7">
            <path d={svgPaths.p15aac100} id="Vector" stroke="var(--stroke-0, #1F2937)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[25%] left-[8.33%] right-[33.34%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 9">
            <path d={svgPaths.pd309880} id="Vector" stroke="var(--stroke-0, #1F2937)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Svg41() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[14px]" data-name="SVG">
      <Frame9 />
    </div>
  );
}

function SvgMargin9() {
  return (
    <div className="box-border content-stretch flex flex-col h-[14px] items-start mr-[-0.01px] pl-0 pr-[8px] py-0 relative shrink-0 w-[22px]" data-name="SVG:margin">
      <Svg41 />
    </div>
  );
}

function Button14() {
  return (
    <div className="box-border content-stretch flex h-[35.99px] items-center justify-center pl-[12.909px] pr-[12.919px] py-[0.909px] relative rounded-[6px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[6px]" />
      <SvgMargin9 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] mr-[-0.01px] not-italic relative shrink-0 text-[14px] text-center text-gray-800 text-nowrap">
        <p className="leading-[20px] whitespace-pre">Watch Tutorial</p>
      </div>
    </div>
  );
}

function Container142() {
  return (
    <div className="box-border content-start flex flex-wrap gap-[8px] items-start pb-0 pt-[7.99px] px-0 relative shrink-0 w-full" data-name="Container">
      <Button12 />
      <Button13 />
      <Button14 />
    </div>
  );
}

function Container143() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading7 />
      <Container141 />
      <Container142 />
    </div>
  );
}

function Margin31() {
  return (
    <div className="basis-0 grow min-h-px min-w-px mr-[-0.01px] relative shrink-0" data-name="Margin">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start pl-[16px] pr-0 py-0 relative w-full">
          <Container143 />
        </div>
      </div>
    </div>
  );
}

function Container144() {
  return (
    <div className="box-border content-stretch flex items-start pl-0 pr-[0.01px] py-0 relative shrink-0 w-full" data-name="Container">
      <Background26 />
      <Margin31 />
    </div>
  );
}

function BackgroundBorder12() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start pb-[24.909px] pt-[40.909px] px-[24.909px] relative w-full">
          <Container144 />
        </div>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Main">
      <div className="max-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] items-start max-w-inherit px-[24px] py-[32px] relative w-full">
          <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Container">
            <NavBreadcrumb />
            <Container4 />
          </div>
          <BackgroundBorder />
          <Container140 />
          <BackgroundBorder12 />
        </div>
      </div>
    </div>
  );
}

function Background27() {
  return (
    <div className="bg-slate-50 min-h-[900px] relative shrink-0 w-full" data-name="Background">
      <div className="min-h-inherit size-full">
        <div className="box-border content-stretch flex flex-col items-start min-h-inherit pb-0 pt-[64px] px-[80px] relative w-full">
          <Main />
        </div>
      </div>
    </div>
  );
}

function Component1440WDefault() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[100px] right-[100px] top-[100px]" data-name="1440w default" style={{ backgroundImage: "linear-gradient(90deg, rgb(248, 250, 252) 0%, rgb(248, 250, 252) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <Margin2 />
      <Button3 />
      <Background27 />
    </div>
  );
}

export default function HttpsRetailflowManagerI7Ysk21PublicBuiltwithrocketNewAiTaskAssignmentByHtmlToDesignFreeVersion28102025134454Gmt() {
  return (
    <div className="bg-[#444444] relative rounded-[2px] size-full" data-name="https://retailflow-manager-i7ysk21.public.builtwithrocket.new/ai-task-assignment by html.to.design ❤️ FREE version - 28/10/2025, 13:44:54 GMT+7">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Component1440WDefault />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[2px]" />
    </div>
  );
}