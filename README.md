# ClassHub Backstage — 리디자인 시안

클래스허브 백스테이지(어드민)의 **UI·화면 흐름만** 정리한 리디자인 시안입니다.
기능이나 데이터 구조는 바꾸지 않았고, **기존 로직 그대로** 둔 상태에서 화면(UI)만 변경했습니다. 정적 HTML로 구현돼 있어 바로 브라우저에서 확인 가능합니다.

## 열어보기
`index.html` 을 브라우저로 열면 됩니다. (별도 빌드/서버 불필요)

## 포함된 화면
- **대시보드** — `dashboard.html`
- **결제** — `payments.html`
- **캘린더** (월간 뷰 · 일정 등록/상세) — `calendar.html`
- **코스** (목록/상세) — `courses.html`, `course-detail.html` · 코스 등록 `course-add.html`
- **기수** (상세/생성) — `cohort-detail.html`, `cohort-create.html`
- **프로그램** (목록/상세, 자체 상품) — `programs.html`, `program-detail.html` · 등록 `course-add-program.html`
- **무료강의** (등록/상세) — `freeclass-create.html`, `freeclass-detail.html`
- **다시보기 VOD** (목록/상세 · 코드 발급) — `replays.html`, `replay-detail.html`
- **수강생** (목록/상세) — `students.html`, `student-detail.html`
- **코치** (목록/상세) — `coaches.html`, `coach-detail.html`
- **쿠폰** (관리/상세=수정/생성) — `coupons.html`, `coupon-detail.html`, `coupon-create.html`
- **매출 리포트** — `sales.html`
- **설정** (비밀번호 변경) — `settings.html`
- **공통 컴포넌트** — `_shared.css`(디자인 토큰), `_select.js`(드롭다운), `_datepicker.js`(달력)

## 참고
- 캘린더: 무료강의·기수·특강처럼 일정이 정해진 것들을 백스테이지에서 한 번에 관리하는 흐름을 제안합니다. 일정 등록 시 자동으로 캘린더에 기입(수정 가능)되는 컨셉입니다.
- 매출 화면: 결제 데이터를 월별로 시각화한 **제안 뷰**입니다. 코치별 정산·세금계산서 등 심화 정산은 별도 정산 시스템 영역이라, 연동 가능 여부/데이터 위치는 확인이 필요합니다.

## 디자인 시스템
- 컬러: Primary `#227EF6`, 배경 `#F7F9FB`, 보더 `#E8ECF1`
- 폰트: Pretendard
