import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, delay, forkJoin, of, switchMap } from 'rxjs';
import { UserActions } from 'src/app/core/store/user.actions';
import { BasketActions } from '../basket/basket.actions';

export interface Price  {
  amount: number;
  currency: string;
}

export interface Product {
  id: string;
  title: string;
  price: Price;
  discount?: number;
  discountPrice?: Price;
  imgSrc: string;
  owned: boolean;
  onBasket: boolean;
  tags: string[];
  dlc?: boolean;
}

export enum Sorting {
  Discount = 'discount'
}

@Injectable({
  providedIn: 'root'
})
export class StoreApiService {

  private simulationOfBackendData: Product[] = mockProducts;

  constructor(private $store: Store) {}

  getProducts(): Observable<Product[]> {
    return of(this.simulationOfBackendData.filter((product) => !product.owned))
      .pipe(
        delay(100),
        switchMap((list) => of(list.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0))))
      );
  }

  addProductToBasket(product: Product): Observable<null> {
    this.updateProduct(product.id, 'onBasket', true);
    return of(null);
  }

  removeProductFromBasket(product: Product): Observable<null> {
    this.updateProduct(product.id, 'onBasket', false);
    return of(null);
  }

  pay(products: Product[], total: number, balance: number): Observable<any> {
    const idsToRemove = products.map(product => product.id);
    const updatedList = [...this.simulationOfBackendData];
    updatedList.forEach((product => {
      if (idsToRemove.includes(product.id)) {
        product.onBasket = false;
        product.owned = true;
      }
    }));

    this.simulationOfBackendData = updatedList;

    this.$store.dispatch(new UserActions.UpdateBalance(balance - total));
    this.$store.dispatch(new BasketActions.ClearProducts());
    return of();
  }

  private updateProduct(id: string, property: string, value: any): void {
    const list = [...this.simulationOfBackendData];
    const index = list.findIndex((x) => x.id === id);
    list[index][property] = value;
    this.simulationOfBackendData = list;
  }
}

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'God of War: Ragnarok',
    price: {
      amount: 60,
      currency: 'USD'
    },
    discount: 5,
    discountPrice: {
      amount: 57,
      currency: 'USD'
    },
    imgSrc: 'https://c.neevacdn.net/image/fetch/s--VQ1n_LCe--/https%3A//images.wallpapersden.com/image/download/god-of-war-ragnarok-hd-game-poster_bG5oZmWUmZqaraWkpJRmbmdlrWZnZWU.jpg?savepath=god-of-war-ragnarok-hd-game-poster_bG5oZmWUmZqaraWkpJRmbmdlrWZnZWU.jpg',
    owned: false,
    onBasket: false,
    tags: ['Action', 'Adventure', 'Hack and Slash', 'Rol', 'Single Player']
  },
  {
    id: '2',
    title: "Marvel’s Spider-Man Remastered",
    price: {
      amount: 60,
      currency: 'USD'
    },
    discount: 25,
    discountPrice: {
      amount: 45,
      currency: 'USD'
    },
    imgSrc: 'https://c.neevacdn.net/image/fetch/s--DO_8Y7iG--/https%3A//cdn1.epicgames.com/offer/4bc43145bb8245a5b5cc9ea262ffbe0e/EGS_MarvelsSpiderManRemastered_InsomniacGamesNixxesSoftware_S1_2560x1440-73702d11161b29a0b7c40a8b489b1808?savepath=EGS_MarvelsSpiderManRemastered_InsomniacGamesNixxesSoftware_S1_2560x1440-73702d11161b29a0b7c40a8b489b1808',
    owned: false,
    onBasket: false,
    tags: ['Superheroes', 'Action', 'Open World', 'Adventure', 'Comics']
  },
  {
    id: '4',
    title: 'Vampire Survivors: Legacy of the Moonspell',
    price: {
      amount: 4.99,
      currency: 'USD'
    },
    imgSrc: 'https://c.neevacdn.net/image/fetch/s--4K_zL0Ch--/https%3A//i.ytimg.com/vi/7wfEzTRiqSE/maxresdefault.jpg?savepath=maxresdefault.jpg',
    owned: false,
    onBasket: false,
    dlc: true,
    tags: ['DLC', 'Action', 'Rol', 'Indie', 'Roguelike']
  },
  {
    id: '5',
    title: 'FIFA 23',
    price: {
      amount: 60,
      currency: 'USD'
    },
    imgSrc: 'https://c.neevacdn.net/image/fetch/s--w73Q4u1B--/https%3A//cdn.videogamesblogger.com/wp-content/uploads/2022/09/fifa-23-cheats.jpg?savepath=fifa-23-cheats.jpg',
    owned: false,
    onBasket: false,
    tags: ['Football', 'Sports', 'e-Sport', 'PvP', 'Multiplayer']
  },
  {
    id: '6',
    title: 'Need for Speed: Heat',
    price: {
      amount: 23.99,
      currency: 'USD'
    },
    imgSrc: 'https://c.neevacdn.net/image/fetch/s--rE6tMklV--/https%3A//www.geeksandcom.com/wp-content/uploads/2019/08/Need-for-Speed-Heat.jpg?savepath=Need-for-Speed-Heat.jpg',
    owned: false,
    onBasket: false,
    tags: ['Racing', 'Open World', 'Multiplayer', 'Action', 'Adventure']
  },
  {
    id: '7',
    title: 'Doom: Eternal',
    price: {
      amount: 24.99,
      currency: 'USD'
    },
    imgSrc: 'https://c.neevacdn.net/image/fetch/s--M63Yn0aV--/https%3A//www.keengamer.com/wp-content/uploads/2020/03/Doom-Eternal-Review.jpg?savepath=Doom-Eternal-Review.jpg',
    owned: false,
    onBasket: false,
    tags: ['Action', 'FPS', 'Hack and Slash', 'Adventure', 'Demons']
  },
  {
    id: '8',
    title: 'Star Wars Jedi Knight: Jedi Academy',
    price: {
      amount: 3.99,
      currency: 'USD'
    },
    imgSrc: 'https://c.neevacdn.net/image/fetch/s--xgUltd4S--/https%3A//i1.wp.com/www.nintendo-insider.com/wp-content/uploads/2020/04/star_wars_jedi_knight_jedi_academy_logo.jpg%3Fresize%3D1280%252C720%26ssl%3D1?savepath=star_wars_jedi_knight_jedi_academy_logo.jpg',
    owned: false,
    onBasket: false,
    tags: ['Action', 'Sci-Fi', 'Multiplayer', 'Third-Person', 'FPS']
  },
  {
    id: '9',
    title: 'Battlerite',
    price: {
      amount: 6.25,
      currency: 'USD'
    },
    imgSrc: 'https://c.neevacdn.net/image/fetch/s--YyBPBLR_--/https%3A//i.redditmedia.com/FnK9Akz6aCuy5QrP5dGW-wHoRscBLrRw9RIIvTCbSDA.png%3Fw%3D320%26s%3D5d5013aeac36a2e2d5c710ba8ea4877a?savepath=FnK9Akz6aCuy5QrP5dGW-wHoRscBLrRw9RIIvTCbSDA.png',
    owned: false,
    onBasket: false,
    tags: ['PvP', 'Multiplayer', 'MOBA', 'Action', 'Competitive']
  },
  {
    id: '10',
    title: 'Mortal Kombat 11',
    price: {
      amount: 12.99,
      currency: 'USD'
    },
    imgSrc: 'https://c.neevacdn.net/image/fetch/s--zJ8otvg4--/https%3A//gameranx.com/wp-content/uploads/2020/06/mortal-kombat11-switch-hero.jpg?savepath=mortal-kombat11-switch-hero.jpg',
    owned: false,
    onBasket: false,
    tags: ['Fight', 'Blood', 'Violent', 'Multiplayer', 'Action']
  },
  {
    id: '11',
    title: 'Hogwarts Legacy',
    price: {
      amount: 60,
      currency: 'USD'
    },
    imgSrc: 'https://c.neevacdn.net/image/fetch/s--rPuvHak---/https%3A//cdn1.dotesports.com/wp-content/uploads/2023/02/13085230/hogwarts-legacy-thumbnail-1674633385754-scaled.jpg?savepath=hogwarts-legacy-thumbnail-1674633385754-scaled.jpg',
    owned: false,
    onBasket: false,
    tags: ['Magic', 'Fantasy', 'Open World', 'Adventure', 'Single Player']
  },
  {
    id: '12',
    title: 'Cuphead',
    price: {
      amount: 5,
      currency: 'USD'
    },
    imgSrc: 'https://c.neevacdn.net/image/fetch/s--NvbiuMiX--/https%3A//playerhud.com/wp-content/uploads/2017/09/Cuphead-Review.jpg?savepath=Cuphead-Review.jpg',
    owned: false,
    onBasket: false,
    tags: ['Difficult', 'Animated', 'Coop', 'Platform', '2D']
  },
  {
    id: '13',
    title: 'Batman: Arkham Knight',
    price: {
      amount: 10,
      currency: 'USD'
    },
    imgSrc: 'https://c.neevacdn.net/image/fetch/s--JiACxp_L--/https%3A//noobist.com/wp-content/uploads/2015/07/Batman-Arkham-Knight-Game-HD-Wallpaper-1080p.jpg?savepath=Batman-Arkham-Knight-Game-HD-Wallpaper-1080p.jpg',
    owned: false,
    onBasket: false,
    tags: ['Action', 'Open World', 'Superheroes', 'Stealth', 'Adventure']
  }
]