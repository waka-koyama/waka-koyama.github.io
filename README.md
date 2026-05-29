# 小山 和香 — Portfolio

音楽・ライブ・旅行が好きな大学生の個人サイトです。  
ビルドツール不要、3ファイル構成（`index.html` / `style.css` / `script.js`）で GitHub Pages にそのまま公開できます。

## GitHub Pages へのデプロイ手順

### 1. リポジトリを作成する

GitHub で新しいリポジトリを作成します。  
ルートドメイン（`https://waka-koyama.github.io/`）として公開する場合は、リポジトリ名を **`waka-koyama.github.io`** にしてください。

```
リポジトリ名: waka-koyama.github.io
公開設定: Public
```

### 2. ファイルをプッシュする

```bash
git init
git add index.html style.css script.js README.md
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/waka-koyama/waka-koyama.github.io.git
git push -u origin main
```

### 3. GitHub Pages を有効にする

1. リポジトリページで **Settings** タブを開く
2. 左サイドバーの **Pages** をクリック
3. **Source** を `Deploy from a branch` に設定
4. **Branch** を `main` / `/ (root)` に設定して **Save**

数分後に `https://waka-koyama.github.io/` で公開されます。

---

## カスタマイズ

| 項目 | 場所 |
|------|------|
| プロフィール写真 | `index.html` の `<img src="YOUR_PHOTO.jpg">` を実際のファイルパスに変更し、同じフォルダに画像を置く |
| X (Twitter) URL | `index.html` の Contact セクションの X リンクの `href="#"` と `YOUR_X_HANDLE` を実際の値に変更 |
| スキル追加 | `index.html` の `#skills` 内の `<ul class="badge-list ...">` に `<li>` を追加 |
| 経歴追加 | `index.html` の `#experience` 内の `<ol class="timeline">` に `<li class="timeline-item">` を追加 |
| ライブ追加 | `index.html` の `#live-grid` 内に `<article class="live-card card {アーティストクラス}">` を追加 |
| アクセントカラー変更 | `style.css` の `:root` の `--accent` `--accent-2` `--accent-3` を変更 |
| 英語翻訳 | `script.js` の `i18n.en` オブジェクトを編集 |

### アーティストクラス一覧

| アーティスト | クラス名 | 色 |
|---|---|---|
| go!go!vanillas | `vanillas` | 青 |
| クリープハイプ | `creep` | ピンク |
| 乃木坂46 | `nogizaka` | 紫 |
| Official髭男dism | `higedan` | 緑 |
| オレンジスパイニクラブ | `orange` | オレンジ |
| その他 | `other` | グレー |

---

## ファイル構成

```
waka-koyama.github.io/
├── index.html   # マークアップ・コンテンツ・ライブデータ
├── style.css    # スタイル・カラー・レイアウト・アーティスト色分け
├── script.js    # テーマ切替・言語切替・フェードイン・ライブフィルター
└── README.md    # このファイル
```

## ローカル確認

```bash
# Python 3 の場合
python -m http.server 8000
# → http://localhost:8000 で確認
```

`file://` プロトコルでも基本動作しますが、`backdrop-filter` が効かないブラウザがあるため、簡易サーバー経由での確認を推奨します。
