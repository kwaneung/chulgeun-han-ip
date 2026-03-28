---
title: "TypeScript 6.0 정식 출시, TS 7 네이티브 컴파일로 가는 다리"
summary: "기존 JS 기반 컴파일러의 ‘마지막 메이저’라는 점이 핵심이에요. this 없는 메서드 추론 개선, #/ 서브패스, Temporal·es2025 타입까지 한 번에 정리했습니다."
date: "2026-03-28"
category: "언어"
---

## 핵심 3줄 요약

1. **TypeScript 6.0**은 지금까지 쓰이던 **JavaScript로 작성된 컴파일러 기반의 마지막 메이저**로 계획되어 있고, 이후 **Go로 짜인 TS 7**으로 넘어가는 **준비 단계**에 가깝습니다.
2. 언어 차원에서는 **`this`를 실제로 쓰지 않는 메서드**에 대한 추론이 좋아지고, Node의 **`#/`로 시작하는 서브패스 import**가 `moduleResolution` `nodenext` / `bundler`에서 지원됩니다.
3. **기본값이 한층 ‘현대적’**으로 바뀌었어요 — 예를 들어 `strict` 기본 `true`, `types` 기본 `[]`, `rootDir` 기본이 `tsconfig` 위치 등. Next.js 프로젝트도 **tsconfig 점검**이 필요할 수 있습니다.

---

## 왜 6.0이 특별한가

공식 블로그에서 강조하듯, 팀은 **Go 기반의 새 컴파일러·언어 서비스**를 개발 중이고, 그것이 **TypeScript 7.0**의 토대가 됩니다. 6.0은 **5.9와 7 사이를 잇는 브릿지**라서, 변경 대부분이 **7 도입·마이그레이션 정렬**에 맞춰져 있습니다. 미리 쓰고 싶다면 npm의 **네이티브 프리뷰**(`@typescript/native-preview` 등)도 안내하고 있어요.

---

## 눈에 띄는 새 기능·개선

### `this`를 안 쓰는 메서드와 추론

객체 리터럴에서 **메서드 축약 문법**(`consume(y) { ... }`)은 암묵적으로 `this`가 있어서, 제네릭 추론에서 **문맥 민감 함수**로 취급되곤 했습니다. **실제로 `this`를 쓰지 않으면** 6.0부터는 그렇게 보지 않아, **화살표 함수와 비슷하게** 추론이 잘 맞는 경우가 많아집니다.

### 서브패스 import `#/…`

Node가 **`#/`로 시작하는 서브패스**를 지원하면서, `package.json`의 `"imports"`에 `"#/*": "./dist/*"` 같은 매핑을 두기 쉬워졌습니다. TypeScript는 **`--moduleResolution` `nodenext` 또는 `bundler`**에서 이를 이해합니다.

### `--stableTypeOrdering`

TS 7의 **병렬 타입 체크**와 맞추려면 내부 타입 ID 순서가 달라질 수 있는데, 선언 파일 출력 순서 등에서 **잡음**이 생길 수 있습니다. 6.0에선 **`--stableTypeOrdering`**으로 7에 가까운 순서를 시험해 볼 수 있어요(체크 시간은 늘어날 수 있음).

### `target` / `lib`에 `es2025`

`es2025`를 `target`·`lib`에 쓸 수 있고, **`RegExp.escape`** 같은 내장 API 타입이 여기로 정리됩니다.

### Temporal, Map upsert, DOM lib

- **Temporal**이 스테이지 4에 올라가면서, `esnext` / `esnext.temporal` 등으로 **내장 타입**을 쓸 수 있습니다.
- **`Map` / `WeakMap`의 `getOrInsert`, `getOrInsertComputed`**(upsert) 같은 **스테이지 4** API가 `esnext` lib에 추가됩니다.
- **`dom` lib**에 `dom.iterable`, `dom.asynciterable` 내용이 흡수되어, 예전처럼 `lib`에 나열을 늘리지 않아도 **반복 가능한 DOM 컬렉션**을 쓰기 쉬워졌습니다.

### `bundler` + `commonjs` 조합

`--moduleResolution bundler`를 **`--module commonjs`**와 함께 쓸 수 있게 되어, `node10` 해상도를 버리고 올릴 때 **선택지**가 넓어졌습니다.

---

## 깨질 수 있는 부분 (Next.js·모노레포에 특히)

공식 글에서 권하는 것처럼, 다음을 한 번쯤 확인하는 게 좋습니다.

| 변화 | 한 줄 메모 |
|------|------------|
| **`strict` 기본 `true`** | 예전에 암묵적으로 끈 프로젝트는 `"strict": false`를 **명시**해야 할 수 있음 |
| **`types` 기본 `[]`** | `process`, Node 내장 등이 안 보이면 **`"types": ["node"]`** 등을 추가 |
| **`rootDir` 기본 `.`** | 예전 추론에 기대왔다면 **`"rootDir": "./src"`** 등을 명시 |
| **ES5·구식 `module` 타깃 등** | 사용 중이면 **폐기 예정** — 마이그레이션·codemod 검토 |

`ignoreDeprecations`로 6.0 경고를 잠시 끌 수 있지만, **7.0에서는 폐기 옵션이 제거**된다고 안내합니다.

---

## 출근한입 프로젝트에서 할 일

지금 저장소는 **TypeScript 5.x**를 쓰고 있을 가능성이 큽니다. 6.0으로 올리려면:

1. **`pnpm add -D typescript@^6`** (또는 팀이 정한 버전)  
2. **`tsconfig.json` / `next-env.d.ts`** — 위 기본값 변경에 맞춰 **명시적 옵션** 정리  
3. **`pnpm run build`**로 Next 빌드·타입 검사 통과 확인  

당장 올리기 부담스러우면 **릴리스 노트·Breaking**만 숙지해 두고, **소규모 브랜치에서 시험**하는 편이 안전합니다.

> **출근한입 한 줄:** “6.0은 끝이 아니라 **환승역**이에요. 다음 열차는 Go 타입체커.”

---

## 참고 (공식)

- [Announcing TypeScript 6.0](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/) — Microsoft TypeScript 블로그, 2026-03-06  
- [TypeScript 6.0 Iteration Plan](https://github.com/microsoft/TypeScript/issues/63085) (GitHub)
