# ClassHub Admin Design System (CADS)

클래스허브 백오피스(백스테이지) 전용 디자인 시스템 운영 문서.
**이 문서 하나로 디자이너 · 개발자 · Claude가 같은 기준으로 작업한다.**

- 정본(Source of Truth): **Figma** (CADS 파일)
- HTML 레포: 승인된 Figma를 구현하는 곳 (참고: `github.com/priceit-dev/backstage-redesign`)
- 최종 수정일: 2026-07-16

---

## 01. Principles (원칙)

1. **명확함 > 화려함** — 운영자가 매일 쓰는 도구. 빠르게 찾고, 헷갈리지 않게.
2. **역할 기반 토큰** — 색을 이름(Blue)이 아니라 역할(Primary)로 쓴다. 브랜드색이 바뀌어도 페이지는 안 고친다.
3. **한 번 만들고 재사용** — 버튼이 30개 생겨도 컴포넌트는 하나. Variant·Property로 해결.
4. **정본은 하나** — 디자인 정본은 Figma. HTML은 구현 결과물. 둘이 따로 놀지 않는다.
5. **패턴 우선** — 낱개 컴포넌트보다 화면 조립 패턴(리스트·폼·상세)이 속도를 만든다.

---

## 02. Foundations (원시 토큰 / Primitives)

### Typography
| 토큰 | px | 역할 |
|---|---|---|
| font/11 | 11 | 배지·캡션 |
| font/12 | 12 | 작은 라벨 |
| font/13 | 13 | 보조 텍스트 |
| font/14 | 14 | **기본 UI 본문** |
| font/15 | 15 | 본문 |
| font/16 | 16 | 소제목 |
| font/18 | 18 | 섹션 제목 |
| font/20 | 20 | h3 |
| font/24 | 24 | **카드 숫자** |
| font/28 | 28 | **KPI 숫자** |
| font/32 | 32 | **Hero** |

**Weight:** 400 Regular · 500 Medium · 600 SemiBold · 700 Bold · 800 ExtraBold
**Family:** Pretendard (Figma는 Pretendard 미지원 시 Gothic A1로 대체)
**Line-height:** 본문 1.55 · 제목 1.3 · 숫자 1.1

### Spacing (4px 기반)
`2 · 4 · 6 · 8 · 10 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64`
- 40·48·64 → 페이지 여백 · 섹션 간격 · 대시보드 카드 간격

### Radius
`6 · 8 · 10 · 12 · 16 · full(999)`

### Shadow
| 토큰 | 값 | 용도 |
|---|---|---|
| shadow/none | none | **카드 대부분 (보더만)** |
| shadow/xs | 0 1px 2px rgba(16,24,40,.04) | 인풋·작은 요소 |
| shadow/sm | 0 1px 3px rgba(16,24,40,.06), 0 1px 2px rgba(16,24,40,.04) | 살짝 뜬 카드 |
| shadow/md | 0 4px 8px -2px rgba(16,24,40,.08), 0 2px 4px -2px rgba(16,24,40,.04) | 팝오버·드롭다운 |
| shadow/lg | 0 20px 60px rgba(0,0,0,.25) | **모달** |

### Border (두께)
`1px(기본) · 1.5px(체크박스·강조) · 2px(탭 활성 밑줄)`

### Control Height
| 토큰 | px | 적용 |
|---|---|---|
| control/sm | 32 | 작은 버튼·칩·필터 |
| control/default | 44 | **Button = Input = Select (기본 통일)** |
| control/large | 52 | Hero 검색창·메인 필터 (최소 사용) |

### Layout / Size
- 사이드바 `260` · 탑바 `64`
- 모달 폭 `440(sm) · 480(md) · 580(lg)`

---

## 03. Semantic Tokens (역할 토큰)

> 값이 같아도 **역할이 다르면 토큰을 분리**한다. (예: border ≠ divider)

### Text
| 토큰 | 값 |
|---|---|
| text/primary | #1D1D1D |
| text/secondary | #4C5261 |
| text/tertiary | #7A8093 |
| text/placeholder | #A5ABBB |
| text/onPrimary | #FFFFFF |
| text/disabled | #A5ABBB |

### Surface
| 토큰 | 값 |
|---|---|
| surface/background | #F7F9FB |
| surface/surface | #FFFFFF |
| surface/surfaceAlt | #F2F5F9 |
| surface/surfaceHover | #EEF2F6 |
| surface/overlay | rgba(29,29,29,.5) |

### Border
| 토큰 | 값 | 역할 |
|---|---|---|
| border/border | #E8ECF1 | 카드·입력창 테두리 |
| border/borderStrong | #CFD6DF | 폼 컨트롤 강조 테두리 |
| border/divider | #E8ECF1 | **테이블·리스트 구분선** (값 동일하나 분리 유지) |
| border/focusRing | rgba(34,126,246,.2) | 포커스 링 |

### Brand
| 토큰 | 값 |
|---|---|
| brand/primary | #227EF6 |
| brand/primaryHover | #1B6CD9 |
| brand/primaryActive | #155BB8 |
| brand/primarySoft | #ECF4FF |
| brand/primaryLine | #7BADF7 |

### Status (base + soft)
| 상태 | base | soft |
|---|---|---|
| success | #0E9A5E | #D4F5E6 |
| warning | #C2670D | #FFF4E2 |
| danger | #C4262A | #FEEAEA |
| info | #2876E5 | #E8F1FF |

### Accent (태그·확장용, base + soft)
| 색 | base | soft |
|---|---|---|
| purple | #5B46C4 | #F1EDFF |
| pink | #E94957 | #FFE2E4 |
| *(확장 예정: orange · mint)* | | |

### Disabled
bg #F2F5F9 · text #A5ABBB · border #E8ECF1

### Utility
codeChip/bg #ECECEC · codeChip/text #1D1D1D

### Chart (Primary 틴트 기반)
line #227EF6 · lineAlt #9DC2F5 · area primary@18% · grid #E8ECF1 · axis #A5ABBB

---

## 04. Component Rules (컴포넌트 API)

> 컴포넌트 제작 전, Variant / Size / State / Property를 먼저 확정한다.
> Figma는 Auto Layout + Variant + Component Property로만 제작. flat 레이어 금지.

| 컴포넌트 | Variant | Size | State | Property |
|---|---|---|---|---|
| **Button** | Primary · Secondary · Outline · Ghost · Danger | sm(32) · md(44) · lg(52) | Default · Hover · Pressed · Disabled · Loading | iconLeft · iconRight · iconOnly · label |
| **Input** | Text · Number · Date · Textarea · Search | md(44) · lg(52·최소사용) | Default · Focus · Filled · Disabled · Error | label · placeholder · unit(원/%/회) · helper · prefixIcon |
| **Select** | — | sm(32) · md(44) | Default · Open · Filled · Disabled | label · placeholder · leadingIcon / 옵션행: Default·Hover·Selected |
| **Checkbox** | — | — | Unchecked · Checked · Indeterminate · Disabled | label |
| **Radio** | — | — | Unselected · Selected · Disabled | label |
| **Badge/Pill** | Success · Warning · Danger · Info · Neutral · Primary · Purple · Pink | — | — | style(Soft · Outline) · label · dot |
| **Tabs** | Underline · Segmented · Pill | — | Default · Active · Hover | countBadge · label |
| **Table** | — | — | Row: Default · Hover · Clickable | cellType(Text · Money · Pill · Chip · **Avatar** · Actions) · align · width |
| **Card** | Basic(보더만) · Elevated(그림자) | — | — | header · sectionTitle · padding |
| **Stat Card** *(별도 컴포넌트)* | Mini · Chart · Revenue · Goal *(확장)* | — | — | label · value · unit · delta · icon |
| **Modal** | — | sm(440) · md(480) · lg(580) | — | header(title+close) · body · **footer(true/false)** · backdrop · scroll |
| **Sidebar** | — | — | item: Default · Hover · Active | icon · label · badge(count/NEW) · active · **collapsed(true/false)** |
| **Header** | — | — | — | **Search · Notification · Avatar · Actions** |
| **Pagination** | — | — | page: Default · Active · Disabled | totalPages · current · prev/next |

---

## 05. Patterns (화면 조립 패턴)

> 컴포넌트보다 중요. 새 페이지를 빠르게 찍어내는 틀.

| 패턴 | 구성 |
|---|---|
| **List Page** | Header + (Search + Filter + Action) 상단바 + Tabs + Table + Pagination |
| **Detail Page** | Breadcrumb + Page Head(제목·상태·액션) + Stat Cards + Section Cards + (Edit) |
| **Form** | Section divider + Field(라벨·인풋·helper) + Form Footer |
| **Search + Filter + Action** | 좌: 검색/필터 · 우: 주요 액션 버튼 (리스트 상단 공통) |
| **Form Footer** | 우측 정렬 [취소(Secondary)] [저장(Primary)] |
| **Delete Confirm** | 경고 모달 — 제목·설명·[취소][삭제(Danger)] |
| **Empty State** | 아이콘 + 안내문 + 액션 버튼 (데이터 없을 때) |
| **Loading** | 스켈레톤 / 스피너 |
| **Error** | 오류 아이콘 + 메시지 + 재시도 |

---

## 06. Naming Rule (명명 규칙)

- **토큰:** `category/role` 소문자 (예: `text/primary`, `border/divider`, `brand/primarySoft`)
- **컴포넌트:** PascalCase (예: `Button`, `StatCard`, `Sidebar`)
- **Variant 프로퍼티:** 컴포넌트 내 `Variant / Size / State` 명확히
- **Figma 레이어:** 의미 기반 (`nav-item`, `card-head`) — `Frame 123` 금지
- **아이콘:** `icon/{name}` (Lucide 기준)

---

## 07. Figma Structure (파일 구조)

```
00_Current HTML Reference   ← html.to.design 임포트 (참고 전용, 정본 아님)
01_Foundations              ← Variables · Styles (Color/Type/Spacing/Radius/Shadow)
02_Components               ← Button·Input·Select … Pagination (재사용 컴포넌트)
03_Patterns                 ← List/Detail/Form/Empty/Loading/Error
04_Core Pages               ← 대시보드·코치·코스/기수·결제·쿠폰·수강생·캘린더 (컴포넌트 조립)
99_Archive                  ← 폐기 버전 보관
```

---

## 08. HTML Rule (레포 운영 규칙)

- HTML 레포는 **승인된 Figma를 구현**하는 곳. 디자인 정본이 아니다.
- 개발 전달은 Figma **Dev Mode** 기준.
- HTML의 하드코딩 값은 점진적으로 Semantic 토큰(CSS 변수)으로 교체.
- `00_Current HTML Reference`는 "현재 구현 상태 비교용"으로만 사용.

---

## 09. Update Rule (수정 규칙)

1. **공통 요소 변경**(사이드바·버튼·색 등) → Figma **컴포넌트/Variable 1곳** 수정 → 전 페이지 자동 반영.
2. **페이지 고유 변경** → 해당 프레임에서 컴포넌트 인스턴스 배치/수정.
3. 브랜드색 변경 → `brand/primary` Variable만 교체 (페이지 수정 X).
4. 변경 확정 → Changelog에 기록 → 개발 반영.
5. flat 임포트 페이지에 수정 필요 시 → 컴포넌트 기반 페이지로 승격 후 수정.

---

## 10. Changelog

| 날짜 | 내용 |
|---|---|
| 2026-07-16 | CADS v0.1 — Foundations · Semantic · Component Rules · Patterns 정의 (초안 확정) |
