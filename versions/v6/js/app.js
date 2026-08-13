/* Единая карта жителя Архангельской области — v6.
   Клон v5, айдентика карта29.рф: мезенский конь, синий #0051BA,
   нежный мультиградиент, свечение за курсором, больше анимаций. */
(function () {
  'use strict';
  var D = window.DATA;
  var app = document.getElementById('app');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Мезенский конь ----------
     Векторизован 1:1 из исходного PNG (карта29.рф). Спрайт объявляется один раз
     в <defs>, инстансы вставляются через <use>; цвета задаются CSS-переменными. */
  var HORSE = {
    vb: '0 0 300.0 197.8',
    ratio: 0.6593,
    red: 'M171 60.4C171 60.4 174.7 51.6 176.6 47.8C178.5 44 180.8 40.5 182.6 37.8C184.4 35.1 185.2 34 187.6 31.6C190 29.2 193.8 25.7 196.8 23.4C199.8 21.1 202.6 19.6 205.8 18C209 16.4 212.8 15 216.2 14C219.6 13 222.7 12.2 226.4 11.8C230.1 11.4 235.1 12.2 238.6 11.4C242.1 10.6 245.8 7.7 247.4 7C249 6.3 248.2 7.2 248.2 7.2C248.2 7.2 246.3 11.5 246 14C245.7 16.5 245.8 19.3 246.4 22C247 24.7 247.8 27.2 249.4 30.4C251 33.6 254.7 38.9 255.8 41C256.9 43.1 256.2 43.2 256.2 43.2C256.2 43.2 250.9 47.4 249.4 48.4C247.9 49.4 247.2 49.4 247.2 49.4C247.2 49.4 247.1 50.1 245.8 48.4C244.5 46.7 241.7 41.9 239.6 39.4C237.5 36.9 235.1 34.7 233.4 33.4C231.7 32.1 230.5 31.7 229.4 31.4C228.3 31.1 227.7 31.6 227 31.8C226.3 32 226.2 32.1 225.4 32.8C224.6 33.5 223.5 34.4 222.4 35.8C221.3 37.2 220.2 38.6 219 41.2C217.8 43.8 216.1 48.3 215.2 51.6C214.3 54.9 214 56.8 213.8 60.8C213.6 64.8 213.8 75.4 213.8 75.4C213.8 75.4 207.5 76.3 203.8 76C200.1 75.7 195.5 74.8 191.8 73.6C188.1 72.4 184.2 70.2 181.6 68.8C179 67.4 178.2 66.6 176.4 65.2C174.6 63.8 171 60.4 171 60.4ZM237 19.4C237 19.4 236.5 21.1 236.6 22C236.7 22.9 237.3 24.2 237.8 25C238.3 25.8 238.8 26.3 239.4 26.6C240 26.9 241.6 27 241.6 27C241.6 27 242.2 26.9 242.2 26.2C242.2 25.5 242 23.9 241.6 23C241.2 22.1 240.4 21.2 239.6 20.6C238.8 20 237 19.4 237 19.4ZM249.2 42.6C249.2 42.6 248 43.6 247.8 44.2C247.6 44.8 247.8 46.4 247.8 46.4L248.6 46.4C248.6 46.4 249.3 46 249.4 45.4C249.5 44.8 249.2 42.6 249.2 42.6ZM214.4 83C214.4 83 208.2 84.5 205.2 84.8C202.2 85.1 199.3 85 196.6 84.8C193.9 84.6 191.4 84.2 188.8 83.6C186.2 83 183.3 82.1 180.8 81.2C178.3 80.3 176.1 79.1 174 78C171.9 76.9 169.9 75.5 168.4 74.4C166.9 73.3 165.2 71.2 165.2 71.2L168.4 66C168.4 66 173.2 70.5 176.2 72.4C179.2 74.3 183.5 76.2 186.4 77.4C189.3 78.6 191 78.9 193.6 79.4C196.2 79.9 198.8 80.4 202.2 80.4C205.6 80.4 214.2 79.2 214.2 79.2L214.4 83ZM214.6 86.6C214.6 86.6 214.8 95.1 214.6 98C214.4 100.9 213.9 102.3 213.4 104C212.9 105.7 212.6 106.8 211.8 108.4C211 110 209.8 112.2 208.8 113.6C207.8 115 207.2 115.7 206 116.8C204.8 117.9 203.2 119.1 201.8 120C200.4 120.9 199.1 121.5 197.4 122.2C195.7 122.9 193.6 123.6 191.4 124C189.2 124.4 187.9 124.7 184.4 124.8C180.9 124.9 177.5 125.1 170.6 124.6C163.7 124.1 149.9 122.3 143 122C136.1 121.7 132.8 122.2 129.2 122.6C125.6 123 124.6 123.2 121.6 124.2C118.6 125.2 114.1 127.1 111.2 128.6C108.3 130.1 106.6 131.5 104.4 133.2C102.2 134.9 100.2 137.3 98 138.8C95.8 140.3 93.3 141.6 91.4 142.2C89.5 142.8 87.8 142.4 86.6 142.2C85.4 142 85.2 141.8 84.4 141C83.6 140.2 82.7 141.1 82 137.6C81.3 134.1 80.3 123.7 80 119.8C79.7 115.9 79.8 116 80 114C80.2 112 80.6 109.7 81.2 107.8C81.8 105.9 82.6 104.3 83.4 102.8C84.2 101.3 85.2 100.2 86.2 99C87.2 97.8 88.1 96.9 89.6 95.8C91.1 94.7 92.7 93.5 95 92.6C97.3 91.7 97.8 90.6 103.4 90.4C109 90.2 122.8 91.5 128.6 91.4C134.4 91.3 135.3 90.7 138.2 90C141.1 89.3 143.8 88.4 146.2 87.4C148.6 86.4 150.7 85.3 152.6 84.2C154.5 83.1 156.3 81.9 157.8 80.6C159.3 79.3 161.6 76.6 161.6 76.6C161.6 76.6 166.2 80.3 168.2 81.6C170.2 82.9 171.4 83.5 173.4 84.4C175.4 85.3 178 86.3 180.2 87C182.4 87.7 183.4 88.2 186.8 88.6C190.2 89 197.2 89.4 200.4 89.4C203.6 89.4 203.8 89.3 206.2 88.8C208.6 88.3 214.6 86.6 214.6 86.6Z',
    black: 'M153.8 83.2C153.8 83.2 157.1 79.4 157.8 78.4C158.5 77.4 157.8 77.2 157.8 77.2L157.2 76.8L152.4 80.2C152.4 80.2 152.7 76.8 153.8 75.4C154.9 74 159.2 71.8 159.2 71.8L160.4 75L162.2 72.8L160.6 68.2L155 71.2C155 71.2 155.1 68.3 156.2 67C157.3 65.7 160.7 64.1 161.8 63.6C162.9 63.1 162.6 63.8 162.6 63.8L164.2 68.8L165.8 66.2L163.8 59.8L158 62.6C158 62.6 158.9 59.6 159.2 58.8C159.5 58 158.7 58.6 159.8 58C160.9 57.4 165.6 55.2 165.6 55.2L167.8 61.8C167.8 61.8 169.5 60.5 169.4 58.8C169.3 57.1 167.2 51.4 167.2 51.4L160.8 54C160.8 54 161 51.2 162.4 50C163.8 48.8 169.4 47 169.4 47L171.2 53.8L171.6 54C171.6 54 173.1 52.5 173 50.8C172.9 49.1 171 43.6 171 43.6L164.6 45.6C164.6 45.6 164.8 42.9 166.2 41.8C167.6 40.7 173.2 39.2 173.2 39.2L175 46.2C175 46.2 176.6 45.5 176.6 43.8C176.6 42.1 175.2 36.2 175.2 36.2L168.2 37.8C168.2 37.8 168.9 35.7 169.4 35C169.9 34.3 170 33.9 171.4 33.4C172.8 32.9 178 32.2 178 32.2L179.2 39.4C179.2 39.4 180.7 38.7 180.8 37C180.9 35.3 180 29.2 180 29.2L172.8 30.2C172.8 30.2 173.6 28.3 174.2 27.6C174.8 26.9 174.7 26.6 176.2 26.2C177.7 25.8 183.4 25.4 183.4 25.4L183.6 32.8C183.6 32.8 185.3 32.6 185.8 30.8C186.3 29 186.4 22.2 186.4 22.2L178.6 22.6L181.2 19L190.8 18.4L189.6 26.8C189.6 26.8 191.6 26.3 192.4 24.4C193.2 22.5 194.4 15.6 194.4 15.6L185.6 15.2C185.6 15.2 187.7 12.3 189.8 11.8C191.9 11.3 198.4 12.4 198.4 12.4C198.4 12.4 199.1 11.9 198.8 13.4C198.5 14.9 196.6 21.2 196.6 21.2C196.6 21.2 198.3 21.3 199.2 19.6C200.1 17.9 202.2 10.8 202.2 10.8L195.2 9C195.2 9 195 8.6 195.8 8.2C196.6 7.8 198.4 6.5 200.2 6.6C202 6.7 206.8 8.8 206.8 8.8L204 16.8C204 16.8 205.9 16.8 207 15.4C208.1 14 210 9.7 210.6 8.4C211.2 7.1 210.6 7.8 210.6 7.8L204.2 5C204.2 5 207.7 3.2 209.6 3.4C211.5 3.6 215.6 6.2 215.6 6.2L212.2 13.4C212.2 13.4 214 13.7 215.2 12.4C216.4 11.1 219.2 5.6 219.2 5.6L213.8 2.4L214 2C214 2 217 0.6 218.6 1C220.2 1.4 223.6 4.2 223.6 4.2L219.8 10.8C219.8 10.8 219.9 11.1 220.4 11C220.9 10.9 221.6 11.3 222.6 10.2C223.6 9.1 226.4 4.2 226.4 4.2L223.2 0.6C223.2 0.6 226 -0.1 227.2 0.4C228.4 0.9 230.4 3.6 230.4 3.6L226.6 9.8L229.2 9.6L232.8 4L231 0.2L234 0.2L236.2 3.4L233 9.4L236 9.2L238.8 4.6L237.4 0.6L240 0.6L242 4.6L239.2 9.4C239.2 9.4 241.1 9.4 242.2 9.2C243.3 9 246 8 246 8C246 8 241.9 10.8 238.6 11.4C235.3 12 229.9 11.4 226.4 11.8C222.9 12.2 220.1 13 217.6 13.6C215.1 14.2 214.1 14.5 211.4 15.6C208.7 16.7 204.5 18.6 201.4 20.4C198.3 22.2 195.6 24.2 193 26.4C190.4 28.6 188.1 31 186 33.4C183.9 35.8 182.2 38.4 180.6 40.8C179 43.2 178.2 44.6 176.6 47.8C175 51 171 59.8 171 59.8C171 59.8 171.4 60.8 172.4 61.8C173.4 62.8 175.5 64.5 177.2 65.8C178.9 67.1 180.7 68.3 182.6 69.4C184.5 70.5 185.7 71.4 188.6 72.4C191.5 73.4 196.2 75 200 75.6C203.8 76.2 208.5 76 211.4 75.8C214.3 75.6 215.2 75.2 217.2 74.6C219.2 74 220.8 73.6 223.4 72.2C226 70.8 230.3 67.9 232.6 66.2C234.9 64.5 235.8 63.3 237.2 61.8C238.6 60.3 239.6 59.3 241 57C242.4 54.7 245.8 48 245.8 48L247.2 49.8C247.2 49.8 244.9 57.8 243.4 61C241.9 64.2 240 66.7 238.4 69C236.8 71.3 235.7 72.7 233.6 74.6C231.5 76.5 228.3 78.7 226 80.2C223.7 81.7 221.9 82.5 219.8 83.4C217.7 84.3 215.5 85 213.2 85.6C210.9 86.2 209.2 86.6 206 86.8C202.8 87 197.8 87 194 86.6C190.2 86.2 186.6 85.4 183 84.2C179.4 83 175.3 81.2 172.2 79.4C169.1 77.6 164.2 73.4 164.2 73.4C164.2 73.4 160.9 77.8 159.2 79.4C157.5 81 153.8 83.2 153.8 83.2ZM237 19.4C237 19.4 238.8 20 239.6 20.6C240.4 21.2 241.2 22.3 241.6 23C242 23.7 242.2 23.9 242.2 24.6C242.2 25.3 241.6 27 241.6 27C241.6 27 240 26.9 239.4 26.6C238.8 26.3 238.3 25.8 237.8 25C237.3 24.2 236.7 22.9 236.6 22C236.5 21.1 237 19.4 237 19.4ZM249.2 42.6C249.2 42.6 249.5 44.8 249.4 45.4C249.3 46 248.6 46.4 248.6 46.4L247.8 46.4C247.8 46.4 247.6 44.8 247.8 44.2C248 43.6 249.2 42.6 249.2 42.6ZM240.6 61.4L240.2 61.2C240.2 61.2 236.7 65.3 234.6 67.2C232.5 69.1 229.6 71 227.4 72.4C225.2 73.8 223.8 74.5 221.2 75.4C218.6 76.3 215.4 77.4 212 77.8C208.6 78.2 204.7 78.3 200.8 77.8C196.9 77.3 192.2 76.1 188.4 74.6C184.6 73.1 180.8 70.9 177.8 68.8C174.8 66.7 170.2 62.2 170.2 62.2L165.2 71.6C165.2 71.6 169.7 75.5 172.6 77.2C175.5 78.9 178.7 80.6 182.4 81.8C186.1 83 190.7 84.1 194.8 84.6C198.9 85.1 203.3 85 207 84.6C210.7 84.2 214.4 83.1 217.2 82.2C220 81.3 222.3 79.9 224 79C225.7 78.1 225.7 78.2 227.6 76.6C229.5 75 233.2 71.9 235.4 69.4C237.6 66.9 240.6 61.4 240.6 61.4ZM89.4 96L84.4 101.6C84.4 101.6 81.5 99.1 79.4 98.2C77.3 97.3 74.6 96.7 72 96.4C69.4 96.1 66.8 96.1 63.6 96.6C60.4 97.1 56.3 98.1 52.8 99.6C49.3 101.1 47.5 101.6 42.8 105.6C38.1 109.6 28.4 120.2 24.4 123.8C20.4 127.4 20.3 126.5 18.8 127.2C17.3 127.9 15.6 127.8 15.6 127.8C15.6 127.8 18.2 126.2 21.8 122.4C25.4 118.6 33.3 109.1 37.2 105.2C41.1 101.3 43 100.5 45.4 99C47.8 97.5 49.3 96.9 51.8 96C54.3 95.1 57.6 94.2 60.6 93.8C63.6 93.4 67.4 93.3 70 93.4C72.6 93.5 76.2 94.2 76.2 94.2C76.2 94.2 73.8 93 72.2 92.6C70.6 92.2 68.6 91.7 66.4 91.6C64.2 91.5 61.4 91.5 59 91.8C56.6 92.1 54.2 92.7 52 93.4C49.8 94.1 48.1 94.7 45.6 96.2C43.1 97.7 39.5 100.1 37 102.2C34.5 104.3 33.2 105.8 30.6 108.6C28 111.4 24.1 116.5 21.6 119.2C19.1 121.9 17.5 123.2 15.8 124.6C14.1 126 12.6 127.1 11.2 127.6C9.8 128.1 7.2 127.6 7.2 127.6C7.2 127.6 12.1 124.4 14.2 122.6C16.3 120.8 17.5 119.6 20 116.8C22.5 114 26.3 108.8 29 105.8C31.7 102.8 33.9 100.7 36.2 98.8C38.5 96.9 40.6 95.6 42.6 94.4C44.6 93.2 46.1 92.4 48.4 91.6C50.7 90.8 53.5 89.8 56.4 89.4C59.3 89 62.8 88.8 65.6 89C68.4 89.2 70.1 89.5 73 90.4C75.9 91.3 82.8 94.6 82.8 94.6C82.8 94.6 82.3 93.6 81 92.8C79.7 92 77.6 90.5 75.2 89.6C72.8 88.7 69.6 87.6 66.6 87.2C63.6 86.8 60.4 86.6 57.2 87C54 87.4 50.3 88.4 47.4 89.4C44.5 90.4 42 91.9 39.8 93.2C37.6 94.5 36.3 95.5 34.2 97.4C32.1 99.3 30.2 101 27.2 104.4C24.2 107.8 18.8 114.6 16 117.6C13.2 120.6 12.6 120.9 10.6 122.4C8.6 123.9 5.7 125.7 4.2 126.4C2.7 127.1 2.5 126.7 1.8 126.6C1.1 126.5 0.2 126 0.2 126C0.2 126 4.8 123.4 6.6 122.2C8.4 121 6.9 123.1 11 118.6C15.1 114.1 26.7 100 31.2 95.2C35.7 90.4 35.7 91.4 38 90C40.3 88.6 42 87.6 45 86.6C48 85.6 52.7 84.6 55.8 84.2C58.9 83.8 61.2 84 63.6 84.2C66 84.4 67.1 84.3 70 85.2C72.9 86.1 78.2 88 81 89.4C83.8 90.8 85.4 92.3 86.8 93.4C88.2 94.5 89.4 96 89.4 96ZM191.8 123.8C191.8 123.8 196.7 122.6 198.8 121.6C200.9 120.6 202.9 119.3 204.6 118C206.3 116.7 207.7 115.1 208.8 113.6C209.9 112.1 211.4 108.8 211.4 108.8C211.4 108.8 212.3 109.7 213.2 110.2C214.1 110.7 215.2 111.4 216.8 111.6C218.4 111.8 216.6 113.6 223 111.6C229.4 109.6 249.1 101.8 255.2 99.6C261.3 97.4 258 98.8 259.6 98.6C261.2 98.4 263.5 98.4 264.8 98.6C266.1 98.8 266.8 99.3 267.6 99.8C268.4 100.3 269 100.6 269.4 101.8C269.8 103 270.4 104.7 270.2 106.8C270 108.9 269.5 110.5 268.2 114.2C266.9 117.9 262.4 129.2 262.4 129.2C262.4 129.2 277.3 138 283.4 141C289.5 144 296.4 145.7 299.2 147C302 148.3 300.2 148.8 300.2 148.8C300.2 148.8 299.5 150 299 150.4C298.5 150.8 297.9 151 297 151.2C296.1 151.4 294.7 151.5 293.8 151.4C292.9 151.3 292.2 151.1 291.4 150.8C290.6 150.5 289.8 150.3 289 149.6C288.2 148.9 287.1 147.8 286.4 146.8C285.7 145.8 285.3 144.5 284.8 143.8C284.3 143.1 283.2 142.8 283.2 142.8C283.2 142.8 282.7 146 282.4 146.8C282.1 147.6 281.9 147.5 281.4 147.6C280.9 147.7 279.9 147.8 279.4 147.6C278.9 147.4 278.2 146.6 278.2 146.6L278.6 144.2L280 144L279.2 145.4L279.8 146.6C279.8 146.6 280.7 146.6 281 146.4C281.3 146.2 281.5 146 281.6 145.6C281.7 145.2 281.8 144.5 281.6 143.8C281.4 143.1 280.6 141.9 280.2 141.4C279.8 140.9 279 140.8 279 140.8C279 140.8 278.6 142.4 278.2 143C277.8 143.6 277.3 144.2 276.6 144.4C275.9 144.6 274 144.4 274 144.4C274 144.4 276.4 143.1 277 142.4C277.6 141.7 277.8 140.2 277.8 140.2L276.6 139.6L274.8 142L271.8 142.2L271.6 141.6C271.6 141.6 273.4 141.5 274 141C274.6 140.5 275.2 138.8 275.2 138.8L273.8 138.2L272.2 139.8C272.2 139.8 270.2 139.8 269.6 139.6C269 139.4 268.8 138.8 268.8 138.8L269 138.2L271 138.8L272.8 137.4C272.8 137.4 264.1 132.2 262.2 131.2C260.3 130.2 261.6 131.2 261.6 131.2C261.6 131.2 261.8 130.4 261 132.4C260.2 134.4 257.8 141 256.8 143C255.8 145 255.6 144.3 255 144.6C254.4 144.9 253 144.6 253 144.6C253 144.6 251.7 143.2 251.6 142.4C251.5 141.6 251.3 140.8 252.2 139.8C253.1 138.8 255.8 137.2 256.8 136.2C257.8 135.2 258.4 134 258.4 134C258.4 134 256.1 135.4 255.2 135.8C254.3 136.2 253.7 136.3 253 136.2C252.3 136.1 251.2 135.4 251.2 135.4L251 133.4C251 133.4 251.7 132.4 252.2 132.2C252.7 132 254.2 132 254.2 132L255.2 133L252.6 133.2L252.2 134.6C252.2 134.6 253.9 135 255 134.6C256.1 134.2 259 132.2 259 132.2L255.6 131.4L255.2 129.8C255.2 129.8 256.8 130.8 257.4 131C258 131.2 258.6 131 259 130.8C259.4 130.6 259.8 130 259.8 130C259.8 130 255.3 127.6 252.4 127C249.5 126.4 247.6 125.7 242.4 126.4C237.2 127.1 226.2 130.5 221.2 131.4C216.2 132.3 214.8 131.9 212.4 131.8C210 131.7 208.8 131.4 207 131C205.2 130.6 203.5 130.1 201.8 129.4C200.1 128.7 198.3 127.9 196.6 127C194.9 126.1 191.8 123.8 191.8 123.8ZM207.4 120.2C207.4 120.2 210.2 122.4 212 123.2C213.8 124 215.5 124.6 218.2 125C220.9 125.4 224.6 125.6 228.4 125.4C232.2 125.2 237.8 124.2 241 124C244.2 123.8 245.4 123.8 247.6 124C249.8 124.2 251.8 124.5 254 125.2C256.2 125.9 260.8 128.2 260.8 128.2C260.8 128.2 265.7 114.9 266.8 111.4C267.9 107.9 267.5 108.2 267.6 107C267.7 105.8 267.6 104.7 267.4 104C267.2 103.3 267.1 103 266.6 102.6C266.1 102.2 265.8 101.7 264.6 101.6C263.4 101.5 261.5 101.3 259.2 102C256.9 102.7 254 104.2 250.6 106C247.2 107.8 243.2 110.8 238.8 113C234.4 115.2 228.1 118.1 224.4 119.4C220.7 120.7 219.4 120.9 216.6 121C213.8 121.1 207.4 120.2 207.4 120.2ZM124.8 123.6C124.8 123.6 123.2 127.4 122.2 129.2C121.2 131 120.8 132 118.6 134.4C116.4 136.8 111.9 141.3 109.2 143.6C106.5 145.9 104.5 146.9 102.2 148.2C99.9 149.5 97.9 150.5 95.2 151.6C92.5 152.7 89.3 153.8 85.8 154.8C82.3 155.8 77.4 156.5 74.4 157.4C71.4 158.3 69.8 159.2 68 160.2C66.2 161.2 64.9 162.4 63.6 163.6C62.3 164.8 63.5 163.1 60.2 167.2C56.9 171.3 47.5 183.7 44 188C40.5 192.3 41.4 191.2 39.4 192.8C37.4 194.4 33.9 196.7 32.2 197.6C30.5 198.5 30.2 198.1 29.4 198C28.6 197.9 27.4 197 27.4 197C27.4 197 27 195.4 27.2 194.8C27.4 194.2 27.8 193.6 28.4 193.2C29 192.8 29.5 192.4 30.8 192.2C32.1 192 34.9 192.1 36.4 191.8C37.9 191.5 39.6 190.4 39.6 190.4C39.6 190.4 35.9 190.1 35 189.8C34.1 189.5 34.3 189.3 34.2 188.8C34.1 188.3 34.2 187.3 34.4 186.8C34.6 186.3 34.9 186.1 35.4 186C35.9 185.9 36.9 185.9 37.4 186C37.9 186.1 38.4 186.8 38.4 186.8L38.4 187.8C38.4 187.8 37.5 187.1 37 187C36.5 186.9 35.4 187.4 35.4 187.4L35.4 188.4C35.4 188.4 35.4 189 36.4 189C37.4 189 41.2 188.6 41.2 188.6L41.8 187.4L39.2 185.4L39.2 182.4L40 182.2L40.4 184.8L43 186.4L43.6 185.2L41.6 183.2L41.8 180.4L43 179.8L42.8 182.6L44.8 184.2L45.6 183.2C45.6 183.2 44.5 181.9 44.4 181.2C44.3 180.5 44.6 179.3 44.8 178.8C45 178.3 45.6 178 45.6 178L46.4 178.2L45.6 180.4L46.4 181.6C46.4 181.6 44.1 185.1 47 181.4C49.9 177.7 60.6 163.5 63.8 159.4C67 155.3 64.6 157.9 66.2 157C67.8 156.1 70.1 155 73.4 153.8C76.7 152.6 83.2 151 86.2 150C89.2 149 89.9 148.4 91.4 147.6C92.9 146.8 94.1 145.9 95.2 145C96.3 144.1 97.1 143.6 98.2 142C99.3 140.4 100.6 137 102 135.2C103.4 133.4 104.5 132.9 106.8 131.4C109.1 129.9 112.6 127.7 115.6 126.4C118.6 125.1 124.8 123.6 124.8 123.6ZM88.2 142.4C88.2 142.4 84.8 142.9 80.8 142.8C76.8 142.7 67.5 141.7 64 141.6C60.5 141.5 61.4 141.8 60 142.2C58.6 142.6 57.2 143.1 55.6 144C54 144.9 52.4 145.9 50.6 147.4C48.8 148.9 46.7 150.9 44.8 153C42.9 155.1 41.7 156.4 39 160C36.3 163.6 31.1 171.4 28.6 174.6C26.1 177.8 25.7 177.8 24.2 179.2C22.7 180.6 20.8 182.2 19.6 183C18.4 183.8 18.2 183.9 17.2 184.2C16.2 184.5 14.6 184.6 13.8 184.6C13 184.6 12.6 184 12.6 184C12.6 184 12.1 182.4 12.4 181.6C12.7 180.8 13.1 179.8 14.6 179.2C16.1 178.6 19.9 178.5 21.6 178C23.3 177.5 24.6 176.4 24.6 176.4C24.6 176.4 21.4 176.1 20.6 175.8C19.8 175.5 19.6 174.6 19.6 174.6L20 172.4C20 172.4 20.8 171.6 21.4 171.6C22 171.6 23.4 172.2 23.4 172.2L23.6 173.8L22.6 172.8L21 173L20.8 174L21.8 175C21.8 175 24.1 175 25 174.8C25.9 174.6 27 173.6 27 173.6C27 173.6 25 171.9 24.6 171C24.2 170.1 24.4 168 24.4 168L25.2 167.6C25.2 167.6 25.3 169.5 25.6 170.2C25.9 170.9 27 171.8 27 171.8L28.4 171.8L28.8 171C28.8 171 27.2 169.5 27 168.6C26.8 167.7 27.4 165.8 27.4 165.8L28.2 165.4C28.2 165.4 28.4 168.3 28.6 169C28.8 169.7 29.6 169.8 29.6 169.8L30.2 169.4L30.2 164.4L31.2 164L31 166.6L31.8 167.2C31.8 167.2 44.1 149 47 144.8C49.9 140.6 48.3 142.9 49.2 142C50.1 141.1 51.1 140.2 52.2 139.6C53.3 139 52.2 139.1 55.6 138.4C59 137.7 68.9 136.3 72.4 135.6C75.9 134.9 74.9 134.9 76.4 134.2C77.9 133.5 81.2 131.2 81.2 131.2C81.2 131.2 81.1 134.3 81.4 135.6C81.7 136.9 82.2 138.2 82.8 139.2C83.4 140.2 84.1 140.9 85 141.4C85.9 141.9 88.2 142.4 88.2 142.4Z',
    white: 'M240.4 61.2C240.4 61.2 238.7 64.1 237.6 65.4C236.5 66.7 235.6 67.7 234 69C232.4 70.3 230.9 71.7 228.2 73.2C225.5 74.7 221.4 76.8 218 78C214.6 79.2 211.2 79.9 207.8 80.2C204.4 80.5 201 80.5 197.4 80C193.8 79.5 189.9 78.7 186.4 77.4C182.9 76.1 179.2 74.3 176.2 72.4C173.2 70.5 168.2 66 168.2 66L170.2 62.2C170.2 62.2 174.8 66.7 177.8 68.8C180.8 70.9 184.8 73.1 188.4 74.6C192 76.1 195.8 77 199.4 77.6C203 78.2 206.7 78.2 210 78C213.3 77.8 216.1 77.1 219 76.2C221.9 75.3 224.8 73.9 227.4 72.4C230 70.9 232.4 69.1 234.6 67.2C236.8 65.3 240.4 61.2 240.4 61.2ZM233.8 74.8C233.8 74.8 234.5 74.7 233.8 75.4C233.1 76.1 232.1 77.5 229.6 79.2C227.1 80.9 221.8 83.9 218.6 85.4C215.4 86.9 213.2 87.3 210.2 88C207.2 88.7 203.9 89.2 200.4 89.4C196.9 89.6 192.8 89.4 189.4 89C186 88.6 183.3 88 180.2 87C177.1 86 174.1 84.9 171 83.2C167.9 81.5 161.8 76.8 161.8 76.8L164.2 73.4C164.2 73.4 169.1 77.6 172.2 79.4C175.3 81.2 179.4 83 183 84.2C186.6 85.4 190.6 86.1 194 86.6C197.4 87.1 200.2 87.2 203.4 87C206.6 86.8 210.5 86.2 213.2 85.6C215.9 85 217.7 84.3 219.8 83.4C221.9 82.5 223.8 81.7 226 80.2C228.2 78.7 233.2 74.6 233.2 74.6L233.8 74.8Z'
  };
  function horseSprite() {
    if (document.getElementById('mezen-horse')) return;
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('width', '0'); s.setAttribute('height', '0');
    s.setAttribute('aria-hidden', 'true');
    s.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
    s.innerHTML = '<defs><g id="mezen-horse">' +
      '<path fill-rule="evenodd" fill="var(--h-red,currentColor)" d="' + HORSE.red + '"/>' +
      '<path fill-rule="evenodd" fill="var(--h-blk,#141B29)" d="' + HORSE.black + '"/>' +
      '<path fill-rule="evenodd" fill="var(--h-wht,#fff)" d="' + HORSE.white + '"/>' +
      '</g></defs>';
    document.body.insertBefore(s, document.body.firstChild);
  }
  function horseSVG(w, opts) {
    opts = opts || {};
    var h = Math.round(w * HORSE.ratio);
    var st = opts.mono ? ' style="--h-blk:currentColor;--h-wht:currentColor"' : '';
    return '<svg class="horse" width="' + w + '" height="' + h + '" viewBox="' + HORSE.vb + '"' + st +
      ' fill="none" aria-hidden="true"><g class="horse-body"><use href="#mezen-horse"/></g></svg>';
  }

  /* ---------- Иконки ---------- */
  var P = {
    bus: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M3 11h18M7 20v-3M17 20v-3"/><circle cx="7.5" cy="14" r=".6" fill="currentColor"/><circle cx="16.5" cy="14" r=".6" fill="currentColor"/>',
    'bus-front': '<path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M4 11h16M8 4V2M16 4V2M7 19v2M17 19v2"/><circle cx="8" cy="15" r=".6" fill="currentColor"/><circle cx="16" cy="15" r=".6" fill="currentColor"/>',
    'graduation-cap': '<path d="m22 10-10-5L2 10l10 5 10-5Z"/><path d="M6 12v5c0 1 2.5 3 6 3s6-2 6-3v-5"/>',
    milk: '<path d="M8 2h8M9 2v2.8a2 2 0 0 1-.4 1.2L7 9v11a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9l-1.6-3A2 2 0 0 1 15 4.8V2"/><path d="M7 14h10"/>',
    pill: '<path d="m10.5 20.5 10-10a5 5 0 0 0-7-7l-10 10a5 5 0 0 0 7 7Z"/><path d="m8.5 8.5 7 7"/>',
    'tent-tree': '<circle cx="4" cy="4" r="2"/><path d="M14 6a4 4 0 0 0-8 0M10 21 4 6M8 21l6-15M8 21h8M13 12l7 9M20 15v6h-6"/>',
    wallet: '<path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5"/><path d="M18 12h.01"/>',
    'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'chevron-up': '<path d="m18 15-6-6-6 6"/>',
    'chevron-right': '<path d="m9 6 6 6-6 6"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    'log-out': '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>',
    'map-pin': '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    map: '<path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    'triangle-alert': '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>',
    'monitor-smartphone': '<path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8M10 19h4M8 15v4M16 10h4a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z"/>',
    smartphone: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
    building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>',
    'shopping-basket': '<path d="m5 11 4-7M19 11l-4-7M2 11h20l-1.4 8.4a2 2 0 0 1-2 1.6H5.4a2 2 0 0 1-2-1.6z"/><path d="M10 15v2M14 15v2"/>',
    'book-open': '<path d="M12 7v14M3 5h5a3 3 0 0 1 3 3M21 5h-5a3 3 0 0 0-3 3M3 5v14h5a3 3 0 0 1 3 3M21 5v14h-5a3 3 0 0 0-3 3"/>',
    croissant: '<path d="m5 15 4-1M15 5l-1 4M4 19l4-9 5 5-9 4ZM3 12a4 4 0 0 1 4-4M12 3a4 4 0 0 0-4 4M21 12a4 4 0 0 0-4-4M12 21a4 4 0 0 1 4-4"/>',
    glasses: '<circle cx="6" cy="15" r="4"/><circle cx="18" cy="15" r="4"/><path d="M14 15a2 2 0 0 0-4 0M2.5 13 5 7c.7-1.3 1.4-2 3-2M21.5 13 19 7c-.7-1.3-1.5-2-3-2"/>',
    drama: '<path d="M10 11h.01M14 6h.01M18 6h.01M6.5 13.1h.01M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3ZM2 8c0 9 4 12 6 12M8 20c-2 0-3.5-1-4.5-2.5"/>',
    'paw-print': '<circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="4" cy="8" r="2"/><circle cx="7.5" cy="14.5" r="2.5"/><path d="M11 14c2 0 4 1 4 4a3 3 0 0 1-6 0c0-3 0-4-2-4"/>',
    dumbbell: '<path d="m6.5 6.5 11 11M21 21l-1-1M3 3l1 1M18 22l4-4M2 6l4-4M3 10l7-7M14 21l7-7"/>',
    pencil: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-3.5-3.5"/>',
  };
  function icon(n, size, color) {
    size = size || 22;
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="' + (color || 'currentColor') +
      '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (P[n] || '') + '</svg>';
  }

  /* ---------- helpers ---------- */
  function emblem(size) {
    size = size || 42;
    return '<span class="emblem" style="width:' + size + 'px;height:' + size + 'px;color:var(--mezen-500)">' + horseSVG(Math.round(size * 0.82)) + '</span>';
  }
  function wordmark(opts) {
    opts = opts || {}; var size = opts.size || 42;
    return '<button class="wordmark' + (opts.inverse ? ' inv' : '') + '"' + (opts.go ? ' data-go="' + opts.go + '"' : '') + '>' +
      emblem(size) + '<span class="wm-txt">' +
      '<span class="wm-1" style="font-size:' + Math.round(size * 0.31) + 'px">' + D.brandTop + '</span>' +
      '<span class="wm-2" style="font-size:' + Math.round(size * 0.26) + 'px">' + D.region + '</span></span></button>';
  }
  function seclabel(text, withHorse) {
    return '<span class="seclabel">' + (withHorse ? horseSVG(22, { mono: true }) : '') + text + '</span>';
  }
  function avatarBox(p, size) { return '<span class="gate-av" style="width:' + size + 'px;height:' + size + 'px;background:' + p.color + ';font-size:' + Math.round(size * 0.4) + 'px">' + p.initials + '</span>'; }
  var STATUS_TONE = { 'Активная': 'success', 'Подключена': 'success', 'Одобрена': 'success', 'На проверке': 'warning', 'Доступна для подключения': 'brand', 'Карта отключена': 'neutral', 'Отключена': 'neutral', 'Недоступна': 'neutral', 'Заблокирована': 'danger', 'Отклонена': 'danger' };
  function status(text) { return '<span class="badge badge-' + (STATUS_TONE[text] || 'neutral') + '"><span class="dot"></span>' + text + '</span>'; }
  function btn(label, variant, opts) {
    opts = opts || {};
    return '<button class="btn btn-' + variant + (opts.size ? ' btn-' + opts.size : '') + '"' +
      (opts.go ? ' data-go="' + opts.go + '"' : '') + (opts.act ? ' data-action="' + opts.act + '"' : '') +
      (opts.attr || '') + '>' + (opts.iconL ? icon(opts.iconL, 18) : '') + label + (opts.iconR ? icon(opts.iconR, 16) : '') + '</button>';
  }
  function table(cols, rows) {
    var head = cols.map(function (c) { return '<th' + (c.w ? ' style="width:' + c.w + 'px"' : '') + '>' + c.title + '</th>'; }).join('');
    var body = rows.map(function (r) {
      return '<tr>' + cols.map(function (c) {
        var v = r[c.key];
        return '<td>' + (v == null || v === '' ? '<span class="empty">—</span>' : v) + '</td>';
      }).join('') + '</tr>';
    }).join('');
    return '<div class="tbl-wrap"><div class="tbl-scroll"><table class="tbl"><thead><tr>' + head + '</tr></thead><tbody>' + body + '</tbody></table></div></div>';
  }

  /* ---------- Состояние ---------- */
  var S = { profileId: null, route: 'landing', hc: false, menuOpen: false,
    promoTab: 'my', promoQ: '', promoCat: '', promoMore: false, cardOn: null, _tiltMove: null };
  function profile() { return D.profiles.filter(function (p) { return p.id === S.profileId; })[0] || null; }
  /* Приветствие по времени суток — как в банковских приложениях. */
  function greeting() {
    var hh = new Date().getHours();
    if (hh >= 5 && hh < 12) return 'Доброе утро';
    if (hh >= 12 && hh < 18) return 'Добрый день';
    if (hh >= 18 && hh < 23) return 'Добрый вечер';
    return 'Доброй ночи';
  }

  /* ================= LANDING ================= */
  function landingHeader() {
    var nav = D.landingMenu.map(function (m) { return '<button data-action="scroll" data-to="' + m[0] + '">' + m[1] + '</button>'; }).join('');
    return '<div class="lhead"><div class="lhead-inner">' + wordmark({ size: 40, go: 'landing' }) +
      '<nav class="lnav">' + nav + '</nav>' +
      '<div class="lhead-right"><a class="lhead-phone hide-sm" href="tel:88002002929">' + D.phone + '</a>' +
      hcToggle() + btn('Личный кабинет', 'brand', { act: 'enter' }) + '</div></div></div>';
  }
  function hcToggle() {
    return '<button class="hc-toggle' + (S.hc ? ' on' : '') + '" data-action="hc">' + icon('eye', 18) + (S.hc ? 'Обычная версия' : 'Высокая контрастность') + '</button>';
  }
  function bankCardArt() {
    return '<div class="bankcard"><span class="bc-sun"></span>' +
      '<span class="bc-horse">' + horseSVG(270) + '</span>' +
      '<div class="bc-top"><span class="bc-brand"><span class="bc-name">Единая карта жителя<br>Архангельской области</span></span>' +
      '<span class="bc-mir">МИР</span></div>' +
      '<div class="bc-bottom"><span class="bc-num">2202 •••• •••• 2902</span><span class="bc-holder">Е. С. Селиванова</span></div>' +
      '<span class="bc-glare"></span></div>';
  }
  function landingHero() {
    var stats = [['129 000', 'жителей уже с картой', 129000, 'space'], ['24', 'льготы подключаются онлайн', 24, ''], ['290+', 'партнёров с кешбэком', 290, '+']];
    var st = stats.map(function (s) {
      return '<div class="hstat"><b data-count="' + s[2] + '" data-fmt="' + s[3] + '">' + s[0] + '</b><span>' + s[1] + '</span></div>';
    }).join('');
    return '<section class="hero"><div class="hero-grid">' +
      '<div class="hero-left">' + seclabel('Социальный сервис региона', true) +
      '<h1>Единая карта жителя<br><span class="br">' + D.region.replace(' области', ' области.') + '</span></h1>' +
      '<p class="hero-lede">Удобная банковская карта для доступа к региональным льготам, проезду и бонусам партнёров. Одна карта вместо стопки справок.</p>' +
      '<div class="hero-actions">' + btn('Подключить карту', 'brand', { size: 'lg', act: 'scroll', attr: ' data-to="how"' }) + btn('Войти в кабинет', 'secondary', { size: 'lg', act: 'enter' }) + '</div>' +
      '<div class="hstats">' + st + '</div></div>' +
      '<div class="hero-cardwrap">' +
      '<span class="hero-blob blob-1"></span><span class="hero-blob blob-2"></span><span class="hero-blob blob-3"></span>' +
      bankCardArt() + '</div></div></section>';
  }
  function landingHow() {
    var ways = D.ways.map(function (w) { return '<div class="fcard reveal"><span class="fc-ic">' + icon(w.icon, 24) + '</span><h4>' + w.t + '</h4><p>' + w.d + '</p></div>'; }).join('');
    var steps = D.steps.map(function (s, i) { return '<li><span class="step-num">' + (i + 1) + '</span>' + s + '</li>'; }).join('');
    return '<section class="sec sec-blue" id="how"><div class="sec-inner">' +
      '<div class="head">' + seclabel('Как подключить', true) + '<h2>Три равнозначных способа получить карту.</h2><p>Выберите тот, который вам удобнее — результат одинаковый.</p></div>' +
      '<div class="svc-grid" style="margin-bottom:34px">' + ways + '</div>' +
      '<div class="how-2" style="display:grid;grid-template-columns:1.4fr 1fr;gap:20px">' +
      '<div class="card card-elevated reveal" style="padding:34px"><h3 class="section-title" style="margin-bottom:4px">Шаги в личном кабинете</h3><ol class="steps">' + steps + '</ol></div>' +
      '<div class="card card-ink reveal" style="padding:34px;display:grid;gap:12px;align-content:start">' + icon('info', 30, 'var(--m-yellow)') +
      '<span style="font-family:var(--font-display);font-weight:800;font-size:22px;line-height:1.2">Что взять в пункт подключения</span>' +
      '<span class="muted" style="font-size:16px;line-height:1.6">Паспорт, СНИЛС и справку УСПН о льготной категории, если она уже оформлена. Сотрудник заполнит заявление сам.</span></div>' +
      '</div></div></section>';
  }
  function landingPoints() {
    var week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    var rows = D.points.map(function (p, idx) {
      var days = week.map(function (d, i) { return '<span class="' + (i > 4 ? 'wknd' : '') + '">' + d + ': ' + (i > 5 ? 'выходной' : i === 5 ? '10:00–15:00' : '9:00–19:00') + '</span>'; }).join('');
      return '<div class="point reveal" data-point="' + idx + '"><div class="point-main">' +
        '<span class="point-ic">' + icon('map-pin', 22) + '</span>' +
        '<span class="point-txt"><b>' + p.n + '</b><span>' + p.a + '</span><span>' + p.p + '</span></span>' +
        '<span class="point-right"><span class="badge badge-success"><span class="dot"></span>Открыто сейчас</span>' +
        '<button class="btn btn-ghost" data-action="point" data-i="' + idx + '">' + p.h + icon('chevron-down', 18) + '</button></span></div>' +
        '<div class="point-week hidden">' + days + '</div></div>';
    }).join('');
    return '<section class="sec" id="points"><div class="sec-inner">' +
      '<div style="display:flex;align-items:flex-end;gap:24px;flex-wrap:wrap">' +
      '<div class="head" style="margin-bottom:44px">' + seclabel('Где получить') + '<h2>Пункты подключения рядом с домом.</h2><p>Более 60 точек в области: банки-партнёры, МФЦ и центры соцподдержки.</p></div>' +
      '<div style="margin-left:auto;margin-bottom:44px" class="tabs"><button data-action="pt-view" data-v="map">Карта</button><button class="active" data-action="pt-view" data-v="list">Список</button></div></div>' +
      '<div style="display:grid;gap:16px">' + rows + '</div></div></section>';
  }
  function landingFaq() {
    var cats = Object.keys(D.faq);
    var tags = cats.map(function (c) { return '<button class="tagchip' + (c === (S.faqCat || cats[0]) ? ' active' : '') + '" data-action="faqcat" data-c="' + c + '">' + c + '</button>'; }).join('');
    var cur = S.faqCat || cats[0];
    var items = D.faq[cur].map(function (qa) {
      return '<div class="faq-i"><button class="faq-q" data-action="faq">' + qa[0] + '<span class="fq-ic">' + icon('plus', 20) + '</span></button>' +
        '<div class="faq-a"><div class="faq-a-in">' + qa[1] + '</div></div></div>';
    }).join('');
    return '<section class="sec sec-cream" id="faq"><div class="sec-inner">' +
      '<div class="head center">' + seclabel('Частые вопросы') + '<h2>Коротко о главном.</h2></div>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-bottom:30px">' + tags + '</div>' +
      '<div class="faq-list">' + items + '</div></div></section>';
  }
  function supportForm(compact) {
    var topics = D.supportTopics.map(function (t) { return '<option>' + t + '</option>'; }).join('');
    return '<form class="form card card-elevated" data-action="submit" style="padding:30px;align-content:start">' +
      '<div class="field"><label>Тема обращения <span class="req">*</span></label><select class="inp"><option value="">Выберите тему</option>' + topics + '</select></div>' +
      '<div class="field"><label>Обращение <span class="req">*</span></label><textarea class="inp" rows="4" placeholder="Опишите ситуацию своими словами"></textarea></div>' +
      '<div class="frow"><div class="field"><label>Фамилия <span class="req">*</span></label><input class="inp" placeholder="Селиванова"></div>' +
      '<div class="field"><label>Имя <span class="req">*</span></label><input class="inp" placeholder="Екатерина"></div>' +
      (compact ? '' : '<div class="field"><label>Отчество</label><input class="inp" placeholder="Сергеевна"></div>') + '</div>' +
      '<div class="field"><label>Способ получения ответа</label><div class="radio-row">' +
      '<label class="radio"><input type="radio" name="r" checked> Звонок оператора</label>' +
      '<label class="radio"><input type="radio" name="r"> Электронная почта</label>' +
      '<label class="radio"><input type="radio" name="r"> Ответ не требуется</label></div></div>' +
      '<div class="check-col"><label class="check"><input type="checkbox" checked> Я даю согласие на обработку персональных данных</label>' +
      '<label class="check"><input type="checkbox" checked> Я согласен с порядком рассмотрения обращений</label></div>' +
      btn('Отправить', 'brand', { size: 'lg', attr: ' type="submit" style="justify-self:start"' }) + '</form>';
  }
  function landingSupport() {
    var contacts = D.supportContacts.map(function (c) {
      var ic = c[0] === 'phone' ? 'phone' : c[0] === 'mail' ? 'mail' : 'map-pin';
      return '<span style="display:flex;gap:12px;align-items:center;font-size:17px;color:var(--ink-700)">' + icon(ic, 20, 'var(--brand-500)') + c[1] + '</span>';
    }).join('');
    return '<section class="sec" id="support"><div class="sec-inner supp-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:46px;align-items:start">' +
      '<div style="display:grid;gap:24px"><div class="head" style="margin-bottom:0">' + seclabel('Поддержка') + '<h2>Не нашли ответ — напишите нам.</h2><p>Опишите ситуацию своими словами. Оператор ответит звонком или письмом — как вам удобнее.</p></div>' +
      '<div class="card card-tinted" style="padding:30px;display:grid;gap:14px">' + contacts + '</div></div>' +
      supportForm(true) + '</div></section>';
  }
  function landingCta() {
    return '<section style="padding:0 24px 96px"><div class="cta2">' +
      '<span class="cta-horse">' + horseSVG(150) + '</span>' +
      '<h2>Оформите карту жителя за 5 минут.</h2><p>Вход по Госуслугам — заявление заполнится автоматически.</p>' +
      '<div style="display:flex;gap:14px;flex-wrap:wrap;justify-content:center">' + btn('Подключить карту', 'brand', { size: 'lg', act: 'enter' }) + btn('Найти пункт рядом', 'secondary', { size: 'lg', act: 'scroll', attr: ' data-to="points"' }) + '</div></div></section>';
  }
  function landingFooter() {
    var nav = D.landingMenu.map(function (m) { return '<a data-action="scroll" data-to="' + m[0] + '">' + m[1] + '</a>'; }).join('');
    return '<footer class="foot" style="margin-top:0"><span class="foot-horse">' + horseSVG(260, { mono: true }) + '</span>' +
      '<div class="foot-inner" style="display:grid;gap:34px">' +
      '<div style="display:flex;gap:32px;align-items:flex-start;flex-wrap:wrap;width:100%">' + wordmark({ inverse: true, size: 42, go: 'landing' }) +
      '<nav class="foot-nav">' + nav + '</nav>' + btn('Личный кабинет', 'brand', { act: 'enter' }) + '</div>' +
      '<div class="foot-bottom"><span>© Все права защищены, 2026</span><span>Версия 1.0</span>' +
      '<span style="margin-left:auto;max-width:620px">Оператор сервиса — Министерство труда, занятости и социального развития ' + D.region + '. Условия программы лояльности уточняйте у партнёров.</span></div>' +
      '</div></footer>';
  }
  function viewLanding() {
    return '<div>' + landingHeader() + landingHero() +
      landingHow() + landingPoints() + landingFaq() + landingSupport() + landingCta() +
      landingFooter() + '</div>';
  }

  /* ================= ЛК: shell ================= */
  function lkHeader() {
    var p = profile();
    var nav = D.lknav.map(function (n) {
      var a = n[0] === S.route || (n[0] === 'home' && S.route === 'transport');
      return '<button class="' + (a ? 'active' : '') + '" data-go="' + n[0] + '">' + n[1] + '</button>';
    }).join('');
    var others = D.profiles.filter(function (x) { return x.id !== p.id; });
    var menu = '';
    if (S.menuOpen) {
      menu = '<div class="menu-scrim" data-action="close-menu"></div><div class="menu">' +
        '<div class="menu-head"><span class="avatar" style="background:' + p.color + ';color:#fff">' + p.initials + '</span><div><b>' + p.name + '</b><span>' + p.role + '</span></div></div>' +
        '<button class="menu-item" data-go="profile"><span class="fam-ic">' + icon('user', 18) + '</span><div class="mt"><b>Мой профиль</b><span>Личные данные</span></div></button>' +
        (others.length ? '<div class="menu-label">Сменить профиль</div>' : '') +
        others.map(function (o) { return '<button class="menu-item" data-action="switch" data-id="' + o.id + '"><span class="avatar" style="width:34px;height:34px;background:' + o.color + ';color:#fff">' + o.initials + '</span><div class="mt"><b>' + o.short + '</b><span>' + o.role + '</span></div></button>'; }).join('') +
        '<div class="menu-divider"></div><button class="menu-plain" data-action="signout">' + icon('log-out', 18) + ' Выйти из аккаунта</button></div>';
    }
    return '<header class="lkhead"><div class="lkhead-top">' + wordmark({ size: 42, go: 'landing' }) +
      '<div class="lkhead-right">' + hcToggle() +
      '<span class="lkhead-name">' + p.short + (p.kind === 'child' ? '<span class="child-badge">Детский</span>' : '') + '</span>' +
      '<div class="menu-wrap"><button class="avatar" style="background:' + p.color + ';color:#fff;cursor:pointer;border:none" data-action="toggle-menu">' + p.initials + '</button>' + menu + '</div>' +
      '<button class="iconbtn" title="Выйти" data-action="signout">' + icon('log-out', 18) + '</button></div></div>' +
      '<nav class="lknav">' + nav + '</nav></header>';
  }
  function lkFooter() {
    var nav = D.lknav.map(function (n) { return '<a data-go="' + n[0] + '">' + n[1] + '</a>'; }).join('');
    return '<footer class="foot"><span class="foot-horse">' + horseSVG(240, { mono: true }) + '</span><div class="foot-inner">' +
      '<div style="display:grid;gap:14px">' + wordmark({ inverse: true, size: 40, go: 'landing' }) +
      '<span class="foot-sub">© Все права защищены, 2026 · Версия 1.0</span></div>' +
      '<nav class="foot-nav">' + nav + '</nav></div></footer>';
  }
  function pageHead(o) {
    var crumbs = o.crumbs ? '<div class="crumbs">' + o.crumbs.map(function (c, i) {
      return (i > 0 ? icon('chevron-right', 15, 'var(--ink-300)') : '') + (c.to ? '<a data-go="' + c.to + '">' + c.label + '</a>' : '<span class="cur">' + c.label + '</span>');
    }).join('') + '</div>' : '';
    return crumbs + '<div class="page-head"><div class="ph-txt"><h1>' + o.title + '</h1>' + (o.lead ? '<p>' + o.lead + '</p>' : '') + '</div>' +
      (o.aside ? '<div class="ph-aside">' + o.aside + '</div>' : '') + '</div>';
  }

  /* ================= ЛК: pages ================= */
  function viewHome() {
    var cards = D.services.map(function (s) {
      return '<button class="svc reveal' + (s.off ? ' off' : '') + '"' + (s.to ? ' data-go="' + s.to + '"' : ' disabled') + '>' +
        '<span class="svc-ic" style="background:' + s.tint + ';color:' + s.accent + '">' + icon(s.icon, 38) + '</span>' +
        '<span style="display:grid;gap:6px"><span class="svc-t" style="font-family:var(--font-display);font-weight:800;font-size:var(--text-h4)">' + s.title + '</span>' +
        '<span class="svc-desc">' + s.desc + '</span></span>' +
        '<span class="svc-foot">' + status(s.status) + (s.to ? '<span class="svc-open">Открыть' + icon('arrow-right', 16) + '</span>' : '') + '</span></button>';
    }).join('');
    var p = profile();
    var name = p.first || p.short;
    return '<div class="page">' +
      pageHead({
        title: '<span class="greet">' + greeting() + ', <em>' + name + '</em></span>',
        lead: 'Здесь собраны услуги, доступные вам по карте жителя. Серые карточки пока недоступны — они появятся, если у вас изменится льготная категория.'
      }) +
      '<div class="wallet reveal"><span class="wallet-horse">' + horseSVG(120, { mono: true }) + '</span>' +
      '<span class="wallet-ic">' + icon('wallet', 26) + '</span>' +
      '<span><b>Карта жителя •••• 2902 активна</b><span class="sub">3 льготные категории · <span class="mono" data-count="1240" data-fmt="space">1 240</span> бонусных баллов</span></span>' +
      '<span class="wallet-actions">' + btn('Мои льготы', 'brand', { go: 'benefits' }) + btn('Мои карты', 'secondary', { go: 'cards' }) + '</span></div>' +
      '<h2 class="section-title reveal">Мои услуги</h2>' +
      '<div class="svc-grid">' + cards + '</div></div>';
  }
  function viewCards() {
    var on = S.cardOn || D.cards.map(function (c) { return c.on; });
    var cardsHtml = D.cards.map(function (c, i) {
      var blocked = c.status === 'Заблокирована';
      var active = c.tone === 'active';
      var style = active ? '' : ' style="background:' + c.tone + (blocked ? ';filter:saturate(.7)' : '') + '"';
      return '<div class="bcard-wrap reveal" style="transition-delay:' + (i * 80) + 'ms"><div class="bcard' + (active ? ' bcard-active' : '') + '"' + style + '>' +
        '<span class="bc-wm">' + horseSVG(150, { mono: !active }) + '</span>' +
        '<div class="bc-top"><span style="color:' + (active ? 'var(--mezen-500)' : '#fff') + '">' + horseSVG(40, { mono: !active }) + '</span><span class="bc-mir">МИР</span></div>' +
        '<div><div class="bc-num">' + c.num + '</div><div class="bc-since">Подключена ' + c.since + '</div></div></div>' +
        '<div class="bcard-foot">' + status(c.status) +
        '<button class="switch' + (on[i] ? ' on' : '') + '" data-action="card-toggle" data-i="' + i + '"' + (blocked ? ' disabled' : '') + ' style="margin-left:auto"></button></div></div>';
    }).join('');
    var addTile = '<div class="bcard-wrap reveal"><button class="addcard">' + icon('plus', 28) + 'Добавить карту</button></div>';
    var rows = D.applications.map(function (a) { return { d: a.d, n: a.n, p: a.p, s: status(a.s), r: a.r }; });
    return '<div class="page">' + pageHead({ title: 'Мои карты', crumbs: [{ label: 'Главная', to: 'home' }, { label: 'Мои карты' }],
      lead: 'Карты жителя, привязанные к вашему профилю. Отключённой картой нельзя оплачивать проезд и покупки, но её можно включить обратно.',
      aside: btn('Подать заявку на карту', 'brand', { size: 'lg', iconL: 'plus' }) }) +
      '<div class="cards-row">' + cardsHtml + addTile + '</div>' +
      '<h2 class="section-title reveal">Мои заявки на подключение карт</h2>' +
      '<div class="reveal">' + table([{ title: 'Дата заявки', key: 'd', w: 160 }, { title: 'Номер карты', key: 'n', w: 160 }, { title: 'Дата обработки', key: 'p', w: 180 }, { title: 'Статус заявки', key: 's', w: 200 }, { title: 'Причина отклонения', key: 'r' }], rows) + '</div></div>';
  }
  function viewBenefits() {
    var catRows = D.benefitCategories;
    var svcRows = D.benefitServices.map(function (x) { return { n: x[0], s: status(x[1]) }; });
    return '<div class="page">' + pageHead({ title: 'Мои льготы', crumbs: [{ label: 'Главная', to: 'home' }, { label: 'Мои льготы' }],
      lead: 'Категории, присвоенные вам органами социальной защиты, и услуги, которые из них следуют.' }) +
      '<div class="wallet reveal" style="margin-bottom:40px"><span class="wallet-horse">' + horseSVG(120, { mono: true }) + '</span>' +
      '<span class="wallet-ic" style="width:62px;height:62px;border-radius:20px">' + icon('bus-front', 30) + '</span>' +
      '<span style="max-width:560px"><b style="font-size:var(--text-h3)">Вы можете пополнить транспортную карту здесь.</b><span class="sub">Деньги зачисляются в течение нескольких минут, комиссия не взимается.</span></span>' +
      '<span class="wallet-actions">' + btn('Пополнить карту', 'brand', { size: 'lg' }) + '</span></div>' +
      '<h2 class="section-title reveal">Мои льготные категории</h2>' +
      '<div class="section-gap reveal">' + table([{ title: 'Льгота', key: 'b' }, { title: 'Начало действия', key: 's', w: 150 }, { title: 'Окончание', key: 'e', w: 150 }, { title: 'Справка УСПН', key: 'r', w: 160 }, { title: 'Дата выдачи', key: 'd', w: 140 }, { title: 'Кем выдана', key: 'o', w: 240 }], catRows) + '</div>' +
      '<h2 class="section-title reveal">Мои услуги</h2>' +
      '<div class="reveal">' + table([{ title: 'Услуга', key: 'n' }, { title: 'Статус услуги', key: 's', w: 300 }], svcRows) + '</div></div>';
  }
  function viewTransport() {
    var rows = D.trips.map(function (t) { return { t: t[0], p: t[1], r: t[2], v: t[3], c: t[4], l: t[5] }; });
    return '<div class="page">' + pageHead({ title: 'Транспорт', crumbs: [{ label: 'Мои услуги', to: 'home' }, { label: 'Транспорт' }],
      lead: 'Карта жителя работает как льготный проездной билет: приложите её к валидатору, поездка спишется автоматически.' }) +
      '<div class="card card-outlined reveal" style="display:flex;gap:14px;align-items:flex-start;margin-bottom:34px;border-color:var(--warning-500);background:var(--warning-100)">' +
      icon('triangle-alert', 22, 'var(--warning-500)') + '<p style="margin:0;font-size:16px;line-height:1.55;color:var(--ink-800);max-width:900px">После подключения услуги вернуться к прежней транспортной карте будет нельзя — все льготные поездки перейдут на карту жителя.</p></div>' +
      '<div class="card card-elevated reveal" style="display:flex;gap:18px;align-items:flex-end;flex-wrap:wrap;margin-bottom:26px;padding:24px">' +
      '<div class="field" style="max-width:220px"><label>Дата начала</label><input class="inp" value="01.08.2026"></div>' +
      '<div class="field" style="max-width:220px"><label>Дата окончания</label><input class="inp" value="12.08.2026"></div>' +
      '<div style="display:flex;gap:12px;margin-left:auto">' + btn('Сбросить', 'ghost') + btn('Применить', 'brand') + '</div></div>' +
      '<h2 class="section-title reveal">История поездок</h2>' +
      '<div class="reveal"><div class="tbl-wrap"><div class="tbl-scroll" style="max-height:460px">' +
      '<table class="tbl"><thead><tr><th style="width:220px">Время поездки</th><th style="width:150px">Стоимость, ₽</th><th style="width:170px">Номер маршрута</th><th>Вид транспорта</th><th style="width:190px">Количество поездок</th><th style="width:180px">Остаток поездок</th></tr></thead><tbody>' +
      rows.map(function (r) { return '<tr><td>' + r.t + '</td><td>' + r.p + '</td><td>' + r.r + '</td><td>' + r.v + '</td><td>' + r.c + '</td><td>' + r.l + '</td></tr>'; }).join('') +
      '</tbody></table></div></div></div></div>';
  }
  function viewPromos() {
    var cats = D.promoCats;
    var list = D.promos.filter(function (p) { return (!S.promoQ || p.n.toLowerCase().indexOf(S.promoQ.toLowerCase()) > -1) && (!S.promoCat || S.promoCat === 'Все категории' || p.c === S.promoCat); });
    var shown = S.promoMore ? list : list.slice(0, 4);
    var grid = shown.map(function (p, i) {
      return '<div class="promo reveal" style="transition-delay:' + (i * 50) + 'ms"><div class="promo-top" style="background:' + p.tint + ';color:' + p.a + '">' + icon(p.icon, 40) + '<span class="badge badge-brand">' + p.v + '</span></div>' +
        '<div class="promo-body"><span class="pc-cat">' + p.c + '</span><h4>' + p.n + '</h4><p>' + p.d + '</p></div></div>';
    }).join('');
    var options = cats.map(function (c) { return '<option' + (c === S.promoCat ? ' selected' : '') + '>' + c + '</option>'; }).join('');
    var mirNote = S.promoTab === 'mir' ? '<div class="card card-tinted reveal" style="margin-bottom:22px;font-size:16px;color:var(--ink-700)">Акции программы «Привет, МИР» доступны при оплате картой жителя платёжной системы МИР.</div>' : '';
    var aside = '<div class="bonus-aside"><span style="display:grid;gap:2px"><span class="ba-label">Бонусный счёт</span><span class="ba-val mono" data-count="1240" data-fmt="space">' + D.bonus + '</span></span>' + btn('Посмотреть', 'brand', { attr: ' style="margin-left:auto"' }) + '</div>';
    return '<div class="page">' + pageHead({ title: 'Акции', crumbs: [{ label: 'Главная', to: 'home' }, { label: 'Акции' }], lead: 'Вы получите скидку или баллы, которые можете потратить на следующую покупку.', aside: aside }) +
      '<div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;margin-bottom:26px">' +
      '<div class="tabs"><button class="' + (S.promoTab === 'my' ? 'active' : '') + '" data-action="promo-tab" data-v="my">Моя выгода</button><button class="' + (S.promoTab === 'mir' ? 'active' : '') + '" data-action="promo-tab" data-v="mir">Привет, МИР</button></div>' +
      '<div style="margin-left:auto;display:flex;gap:14px;flex-wrap:wrap"><input class="inp" id="promoSearch" placeholder="Искать" value="' + S.promoQ + '" style="width:260px;height:44px"><select class="inp" id="promoCat" style="width:220px;height:44px"><option value="">Категории</option>' + options + '</select></div></div>' +
      mirNote + '<div class="promo-grid" id="promoGrid">' + grid + '</div>' +
      (shown.length === 0 ? '<p style="font-size:17px;color:var(--ink-500)">Пока пусто. Измените запрос или категорию.</p>' : '') +
      (!S.promoMore && list.length > 4 ? '<div style="display:flex;justify-content:center;margin-top:30px">' + btn('Показать ещё', 'secondary', { size: 'lg', act: 'promo-more' }) + '</div>' : '') +
      '</div>';
  }
  function viewProfile() {
    var pr = D.profile;
    var kv = function (arr) { return arr.map(function (r) { return '<div class="kv"><b>' + r[0] + '</b><span>' + r[1] + '</span></div>'; }).join(''); };
    var fam = pr.family.map(function (f) { return '<div class="fam-row"><span class="fam-ic">' + icon('user', 20) + '</span><span style="display:grid;gap:2px"><span style="font-size:16px;font-weight:700">' + f[0] + '</span><span style="font-size:14px;color:var(--ink-500)">' + f[1] + '</span></span></div>'; }).join('');
    return '<div class="page">' + pageHead({ title: 'Профиль', crumbs: [{ label: 'Главная', to: 'home' }, { label: 'Профиль' }],
      lead: 'Данные подтягиваются из органов социальной защиты. Контакты вы можете изменить сами.', aside: btn('Редактировать', 'secondary', { iconL: 'pencil' }) }) +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:24px" class="cards-fam">' +
      '<div class="card card-elevated reveal" style="padding:30px;display:grid;gap:20px"><h2 class="section-title" style="margin:0">Личные данные</h2>' + kv(pr.personal) + '</div>' +
      '<div style="display:grid;gap:24px;align-content:start">' +
      '<div class="card card-elevated reveal" style="padding:30px;display:grid;gap:20px"><h2 class="section-title" style="margin:0">Контакты</h2>' + kv(pr.contacts) + '</div>' +
      '<div class="card card-elevated reveal" style="padding:30px;display:grid;gap:16px"><h2 class="section-title" style="margin:0">Члены семьи</h2>' + fam + '</div>' +
      '</div></div></div>';
  }
  function viewSupport() {
    return '<div class="page">' + pageHead({ title: 'Поддержка', crumbs: [{ label: 'Главная', to: 'home' }, { label: 'Поддержка' }], lead: 'Напишите нам — оператор разберётся в ситуации и ответит удобным для вас способом.' }) +
      '<div style="display:grid;grid-template-columns:1fr 340px;gap:30px;align-items:start" class="supp-grid">' + supportForm(false) +
      '<div style="display:grid;gap:18px">' +
      '<div class="card card-ink reveal" style="padding:26px;display:grid;gap:10px">' + icon('phone', 30, 'var(--m-yellow)') +
      '<span style="font-family:var(--font-display);font-weight:800;font-size:22px">' + D.phone + '</span><span class="muted" style="font-size:15px;line-height:1.5">Звонок бесплатный, ежедневно с 8:00 до 20:00.</span></div>' +
      '<div class="fcard reveal"><span class="fc-ic">' + icon('clock', 22) + '</span><h4>Срок ответа</h4><p>До одного рабочего дня по обращениям из личного кабинета.</p></div>' +
      '<div class="fcard reveal"><span class="fc-ic">' + icon('map-pin', 22) + '</span><h4>Личный приём</h4><p>г. Архангельск, ул. Воскресенская, 105, каб. 2 — по будням с 9:00 до 18:00.</p></div>' +
      '</div></div></div>';
  }

  /* ================= GATE ================= */
  function gate() {
    var cards = D.profiles.map(function (p) {
      return '<button class="gate-card" data-action="select" data-id="' + p.id + '">' +
        '<span class="gate-tag' + (p.kind === 'child' ? ' child' : '') + '">' + (p.kind === 'child' ? 'Детский профиль' : 'Родитель') + '</span>' +
        '<span class="gc-horse">' + horseSVG(130, { mono: true }) + '</span>' +
        avatarBox(p, 76) + '<b>' + p.short + '</b><span class="gate-role">' + p.role + '</span>' +
        '<span class="gate-go">Войти' + icon('chevron-right', 16) + '</span></button>';
    }).join('');
    return '<div class="gate"><div class="gate-inner"><div class="gate-brand">' + horseSVG(150) + '</div>' +
      seclabel('Вход выполнен через Госуслуги') +
      '<h1 class="gate-title">Кто заходит?</h1>' +
      '<p class="gate-lede">Выберите профиль для входа в личный кабинет «Карты жителя». Детскими профилями управляет родитель.</p>' +
      '<div class="gate-grid">' + cards + '</div>' +
      '<p style="margin-top:32px"><a data-go="landing" style="cursor:pointer;font-weight:700">Ещё нет карты? Как её получить →</a></p></div></div>';
  }

  var CAB = { home: viewHome, cards: viewCards, benefits: viewBenefits, transport: viewTransport, promos: viewPromos, profile: viewProfile, support: viewSupport };

  /* ---------- Render ---------- */
  function render() {
    document.documentElement.setAttribute('data-hc', S.hc ? '1' : '0');
    if (S.route === 'landing') { app.innerHTML = '<div class="view">' + viewLanding() + '</div>'; afterRender(); return; }
    if (!S.profileId) { app.innerHTML = '<div class="view">' + gate() + '</div>'; afterRender(); return; }
    var v = (CAB[S.route] || viewHome)();
    app.innerHTML = lkHeader() + '<div class="view">' + v + '</div>' + lkFooter();
    afterRender();
  }
  function afterRender() {
    if (S._tiltMove) { document.removeEventListener('mousemove', S._tiltMove); S._tiltMove = null; }
    initReveal(); initCounters(); initTilt();
    var ps = document.getElementById('promoSearch');
    if (ps) ps.addEventListener('input', function (e) { S.promoQ = e.target.value; render(); var el = document.getElementById('promoSearch'); if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); } });
    var pc = document.getElementById('promoCat');
    if (pc) pc.addEventListener('change', function (e) { S.promoCat = e.target.value; render(); });
  }

  /* ---------- Анимации ---------- */
  function initReveal() {
    var els = [].slice.call(document.querySelectorAll('.reveal'));
    if (reduce) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var obs = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); obs.unobserve(x.target); } }); }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach(function (e) { obs.observe(e); });
  }
  function fmt(n, f) { return f === 'space' ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : String(n); }
  function initCounters() {
    var els = [].slice.call(document.querySelectorAll('[data-count]'));
    if (reduce) { els.forEach(function (e) { e.textContent = fmt(e.getAttribute('data-count'), e.getAttribute('data-fmt')) + (e.getAttribute('data-fmt') === '+' ? '+' : ''); }); return; }
    var obs = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { obs.unobserve(x.target); count(x.target); } }); }, { threshold: 0.5 });
    els.forEach(function (e) { e.textContent = '0'; obs.observe(e); });
  }
  function count(el) {
    var target = parseInt(el.getAttribute('data-count'), 10), f = el.getAttribute('data-fmt'), dur = 1300, start = performance.now();
    (function tick(now) {
      var pr = Math.min((now - start) / dur, 1), e = 1 - Math.pow(1 - pr, 3), val = Math.round(e * target);
      el.textContent = fmt(val, f) + (f === '+' && pr === 1 ? '+' : '');
      if (pr < 1) requestAnimationFrame(tick);
    })(start);
  }
  /* Наклон карты + параллакс капель за курсором */
  function initTilt() {
    if (reduce) return;
    var card = document.querySelector('.bankcard');
    var blobs = [].slice.call(document.querySelectorAll('.hero-blob'));
    if (!card && !blobs.length) return;
    function move(e) {
      if (card) {
        var r = card.getBoundingClientRect();
        var ry = (e.clientX - (r.left + r.width / 2)) / 16;
        var rx = -(e.clientY - (r.top + r.height / 2)) / 16;
        rx = Math.max(-15, Math.min(15, rx)); ry = Math.max(-15, Math.min(15, ry));
        card.style.transform = 'rotate(-4deg) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
      }
      var dx = (e.clientX - window.innerWidth / 2), dy = (e.clientY - window.innerHeight / 2);
      blobs.forEach(function (b, i) {
        var f = [0.018, -0.014, 0.01][i % 3];
        b.style.translate = (dx * f) + 'px ' + (dy * f) + 'px';
      });
    }
    document.addEventListener('mousemove', move);
    S._tiltMove = move;
  }
  /* Свечение за курсором (два слоя с разной инерцией) */
  function initGlow() {
    if (reduce || !window.matchMedia('(pointer:fine)').matches) return;
    var a = document.createElement('div'); a.className = 'glow glow-a';
    var b = document.createElement('div'); b.className = 'glow glow-b';
    document.body.appendChild(b); document.body.appendChild(a);
    var tx = window.innerWidth / 2, ty = window.innerHeight * 0.35;
    var ax = tx, ay = ty, bx = tx, by = ty, seen = false;
    document.addEventListener('mousemove', function (e) { tx = e.clientX; ty = e.clientY; seen = true; });
    (function loop() {
      ax += (tx - ax) * 0.11; ay += (ty - ay) * 0.11;
      bx += (tx - bx) * 0.05; by += (ty - by) * 0.05;
      var op = seen ? 1 : 0;
      a.style.opacity = op; b.style.opacity = op;
      a.style.transform = 'translate(' + ax + 'px,' + ay + 'px) translate(-50%,-50%)';
      b.style.transform = 'translate(' + bx + 'px,' + by + 'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- Навигация / события ---------- */
  function go(route) { S.route = route; S.menuOpen = false; window.scrollTo(0, 0); render(); }
  function scrollToId(id) { var el = document.getElementById(id); if (el) window.scrollTo({ top: el.offsetTop - 110, behavior: reduce ? 'auto' : 'smooth' }); }

  document.addEventListener('click', function (e) {
    var actEl = e.target.closest('[data-action]');
    var goEl = e.target.closest('[data-go]');
    if (actEl) {
      var a = actEl.getAttribute('data-action');
      if (a === 'faq') { var it = actEl.closest('.faq-i'); var box = it.querySelector('.faq-a'); var open = it.classList.toggle('open'); box.style.maxHeight = open ? box.scrollHeight + 'px' : '0px'; return; }
      if (a === 'point') { var pw = actEl.closest('.point').querySelector('.point-week'); pw.classList.toggle('hidden'); actEl.querySelector('svg').outerHTML = pw.classList.contains('hidden') ? icon('chevron-down', 18) : icon('chevron-up', 18); return; }
      if (a === 'scroll') { scrollToId(actEl.getAttribute('data-to')); return; }
      if (a === 'hc') { S.hc = !S.hc; render(); return; }
      if (a === 'enter') { S.route = 'home'; S.menuOpen = false; window.scrollTo(0, 0); render(); return; }
      if (a === 'toggle-menu') { S.menuOpen = !S.menuOpen; render(); return; }
      if (a === 'close-menu') { S.menuOpen = false; render(); return; }
      if (a === 'select' || a === 'switch') { S.profileId = actEl.getAttribute('data-id'); S.route = 'home'; S.menuOpen = false; window.scrollTo(0, 0); render(); return; }
      if (a === 'signout') { S.profileId = null; S.route = 'home'; S.menuOpen = false; window.scrollTo(0, 0); render(); return; }
      if (a === 'faqcat') { S.faqCat = actEl.getAttribute('data-c'); render(); return; }
      if (a === 'pt-view') { [].forEach.call(actEl.parentNode.children, function (b) { b.classList.remove('active'); }); actEl.classList.add('active'); return; }
      if (a === 'promo-tab') { S.promoTab = actEl.getAttribute('data-v'); render(); return; }
      if (a === 'promo-more') { S.promoMore = true; render(); return; }
      if (a === 'card-toggle') { var i = +actEl.getAttribute('data-i'); var on = S.cardOn || D.cards.map(function (c) { return c.on; }); on[i] = !on[i]; S.cardOn = on; actEl.classList.toggle('on', on[i]); return; }
      if (a === 'submit') return;
    }
    if (goEl) { e.preventDefault(); go(goEl.getAttribute('data-go')); return; }
  });
  document.addEventListener('submit', function (e) {
    if (e.target.closest('[data-action="submit"]')) {
      e.preventDefault();
      var b = e.target.querySelector('button[type="submit"]');
      if (b) { var t = b.innerHTML; b.textContent = 'Обращение отправлено ✓'; b.disabled = true; setTimeout(function () { b.innerHTML = t; b.disabled = false; }, 2200); }
    }
  });

  horseSprite();
  initGlow();
  render();
})();
